
import { 
  CacheService,
  ConfigurationService,
  NotificationService,
  StorageService
} from '../';

// Options for xfetch requests
interface XOptions {
  cacheShort?: number,
  cacheLong?: number,
  method?: string,
  page?: number,
  params?: URLSearchParams
}

// Result object returned by xfetch
export interface Result {
  data: any,
  isCache: boolean,
  page?: number,
  pagination?: PaginationInfo
}

// Callable functions to load more data
interface PaginationInfo {
  current?: () => void;
  next?: () => void;
  prev?: () => void;
  first?: () => void;
  last?: () => void;
}

// Callback used by xfetch
type ResultHandler = (res: Result) => void;

export abstract class APIBaseService {
  
  constructor(private scope: string,
              private storageService: StorageService,
              private notifService: NotificationService,
              private cacheService: CacheService,
              private configService: ConfigurationService) {}

  // Shared by all API calls, appends auth and handles cache/configurables
  async xfetch(endpoint: string, callback: ResultHandler, options?: XOptions): Promise<void> {
    // User must be authorized to make API calls.
    if (!this.storageService.has("oauth_token")) {
      this.notifService.notify("You are not authorized!", 0);
      throw new Error("No oauth_token value found.");
    }

    // Return the cached value, if it exists
    const cacheId = options?.params ? `${endpoint}.${options.params.toString()}` : endpoint;
    const cached = this.getCached(cacheId);
    if (cached && cached.value) {
      callback({
        data: JSON.parse(cached.value),
        isCache: true,
        page: options?.page ?? 0
      });

      // If cache less than max short duration, stop network request.
      const cacheElapsedTime = new Date().getTime() - cached.cachedAt;
      // Either a specified value in options or fifteen seconds.
      const cacheMaxShortDuration = options?.cacheShort ?? 15000;
      if (cacheElapsedTime < cacheMaxShortDuration) {
        this.notifService.notify("Loaded cached data.", 2);
        return;
      }

      // Low bandwidth mode extends the time limit to set value or short value + 20 seconds.
      const reducedNetwork = <boolean>this.configService.get("networking", "stop_calls_if_cached").value;
      const cacheMaxLongDuration = options?.cacheLong ?? cacheMaxShortDuration + 20000;
      if (reducedNetwork && cacheElapsedTime < cacheMaxLongDuration) {
        this.notifService.notify("Low Bandwith Mode: You might be seeing stale data.", 1);
        return;
      }
    }

    // If offline mode (frozen data) is enabled, stop API requests.
    const offlineMode = <boolean>this.configService.get("networking", "offline_mode").value;
    if (offlineMode) {
      this.notifService.notify("Your data is frozen. Network requests to get new data are paused.", 0);
      return;
    }

    // Initiate UI for a long running action
    this.notifService.triggerActionLoading();
    // Note start time for API call (perf log)
    const callStart = new Date();

    // Get app domain for API calls
    const domain = <string>this.configService.get("caravan", "domain").value;
    if (!domain) {
      this.notifService.notify("There is a caravan.domain configuration error.", 0);
      return;
    }

    // Construct the endpoint URL
    const token = this.storageService.get("oauth_token");
    const base = `https://${domain}/api/v1/${this.scope}`;
    const params = `access_token=${token}&${options?.params?.toString()}`;
    const url = `${base}/${endpoint}?${params}`;
    // API is always fetched with a CORS proxy due to Canvas limitations
    // Advisable to set up your own (secure) CORS proxy
    await fetch(`https://cors.sdbagel.com/${url}`,
                {
                  method: options?.method ?? "GET",
                  headers: { 'accept': 'application/json' }
                })
      .then(async response => {
        const res = await response.text();

        // If pagination info exists, build response object
        let pageInfo: PaginationInfo = undefined;
        if (response.headers.has('link')) {
          const linkHeader = response.headers.get('link');
          pageInfo = this.buildPaginationInfo(linkHeader, callback, options);
        }

        // Cache in localstorage with cacheId
        this.cache(cacheId, res);

        // Resolve action (notifService handles informing user)
        this.notifService.triggerActionFinished();

        // Return the data and denote is fresh
        callback({
          data: JSON.parse(res),
          isCache: false,
          page: options?.page ?? 0,
          pagination: pageInfo
        });

        // Note end time and warn in console if slow network (>2000ms)
        const callEnd = new Date();
        const callElapsed = callEnd.getTime() - callStart.getTime();
        if (callElapsed > 2000)
          console.warn(`[WARN] [${this.scope}, ${endpoint}] Encountered slow network: ${callElapsed}ms`);
      })
      .catch(ex => {
        // Resolve long-running action
        this.notifService.triggerActionFinished();

        // Inform user of failure to load or stale data.
        if (cached?.value)
          this.notifService.notify('You are seeing stale data. It may not be up to date.', 1);
        else
          this.notifService.notify('Failed to get data (network error).', 0);

        throw new Error(ex);
      });
  }
  
  private buildPaginationInfo(link: string, callback: ResultHandler, options?: XOptions): PaginationInfo {
    const pageInfo = {};
    const links = link.split(',');
    
    links.forEach(l => {
      // Get the key (current, next, etc.) and API URL
      const key = l.match(/rel="(.+)"/)[1];
      const url = l.match(/<(.+)>;/)[1];
      // Get the endpoint and params from the URL
      let endpoint = "";
      const urlMatch = url.match(/api\/v1\/[^\/]+\/(.+)\?/);
      if (urlMatch) endpoint = urlMatch[1];
      const params = new URLSearchParams(url.match(/\?(.+)/)[1]);

      // Generate a page number for identity
      let pageNumber = options?.page ?? 0;
      switch (key) {
        case 'next': pageNumber++; break;
        case 'prev': pageNumber--; break;
        case 'first': pageNumber = 0; break;
      }

      // Generate a callable function to load data
      pageInfo[key] = async () => {
        this.xfetch(endpoint,
          res => { callback(res); },
          {
            cacheShort: options?.cacheShort,
            cacheLong: options?.cacheLong,
            params: params,
            page: pageNumber
          });
      };
    });

    return pageInfo;
  }

  // Get cache with caching service
  private getCached(endpoint: string): { cachedAt: number, value: string } | undefined {
    return this.cacheService.getCached(this.scope, endpoint);
  }

  // Set cache of an endpoint
  private cache(endpoint: string, value: string): void {
    this.cacheService.cache(this.scope, endpoint, value);
  }

}
