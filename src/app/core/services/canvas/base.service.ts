
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
interface Result<T> {
  data: T,
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
export type ResultHandler<T> = (res: Result<T>) => void;

export abstract class APIBaseService {
  
  constructor(private scope: string,
              private storageService: StorageService,
              private notifService: NotificationService,
              private cacheService: CacheService,
              private configService: ConfigurationService) {}

  // Shared by all API calls, appends auth and handles cache/configurables
  async xfetch<T>(endpoint: string, callback: ResultHandler<T>, options?: XOptions): Promise<void> {
    // User must be authorized to make API calls.
    if (!this.storageService.has("oauth_token")) {
      this.notifService.notify("You are not authorized!", 0);
      throw new Error("No oauth_token value found.");
    }

    // Skip caching if the request method isn't a GET request.
    const cacheId = options?.params ? `${endpoint}.${options.params.toString()}` : endpoint;
    const cached = this.cacheService.getCached(this.scope, cacheId);
    if (options?.method ?? 'GET' === 'GET') {
      // Check that the cache exists, if so, return it
      if (cached && cached.value) {
        // Generate pagination info from cache (if applicable)
        let pageInfo: PaginationInfo = undefined;
        if (cached.link)
          pageInfo = this.buildPaginationInfo<T>(cached.link, callback, options);

        // Return the cached value and additional info
        callback({
          data: JSON.parse(cached.value),
          isCache: true,
          page: options?.page ?? 0,
          pagination: pageInfo
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
        const reducedNetwork = this.configService.getVal<boolean>("networking", "stop_calls_if_cached");
        const cacheMaxLongDuration = options?.cacheLong ?? cacheMaxShortDuration + 20000;
        if (reducedNetwork && cacheElapsedTime < cacheMaxLongDuration) {
          this.notifService.notify("Low Bandwith Mode: You might be seeing stale data.", 1);
          return;
        }
      }
    }

    // If offline mode (frozen data) is enabled, stop API requests.
    const offlineMode = this.configService.getVal<boolean>("networking", "offline_mode");
    if (offlineMode) {
      this.notifService.notify("Your data is frozen. Network requests to get or set data are paused.", 0);
      return;
    }

    // Initiate UI for a long running action
    this.notifService.triggerActionLoading();
    // Note start time for API call (perf log)
    const callStart = new Date();

    // Get app domain for API calls
    const domain = this.configService.getVal<string>("canvas", "domain");
    if (!domain) {
      this.notifService.notify("There is a caravel.domain configuration error.", 0);
      return;
    }

    // Construct the endpoint URL
    const token = this.storageService.get("oauth_token");
    const base = `https://${domain}/api/v1/${this.scope}`;
    const params = options?.params?.toString() ?? "";
    const url = `${base}/${endpoint}?${params}`;

    // API is always fetched with a CORS proxy due to Canvas limitations
    // Advisable to set up your own (secure) CORS proxy
    await fetch(`https://cors.sdbagel.com/${url}`,
                {
                  method: options?.method ?? "GET",
                  headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
                })
      .then(async response => {
        const res = await response.text();

        // If pagination info exists, build response object
        let pageInfo: PaginationInfo = undefined;
        let linkHeader: string = undefined;
        if (response.headers.has('link')) {
          linkHeader = response.headers.get('link');
          pageInfo = this.buildPaginationInfo<T>(linkHeader, callback, options);
        }

        // Cache with cacheId and related info if is GET request
        if (options?.method ?? 'GET' === 'GET')
          this.cacheService.cache(this.scope, cacheId, res, linkHeader);

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
  
  private buildPaginationInfo<T>(
    link: string, 
    callback: ResultHandler<T>,
    options?: XOptions): PaginationInfo {
    // Split header into list of links
    const pageInfo = {};
    const links = link.split(',');
    
    links.forEach(l => {
      // Get the key (current, next, etc.) and API URL
      const keyMatcher = /rel="(.+)"/;
      const key = keyMatcher.exec(l)[1];
      const urlMatcher = /<(.+)>/;
      const url = urlMatcher.exec(l)[1];
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
      const newOpts: XOptions = {
        cacheShort: options?.cacheShort,
        cacheLong: options?.cacheLong,
        params: params,
        page: pageNumber
      };
      pageInfo[key] = () => {
        this.xfetch(endpoint, callback, newOpts);
      };
    });

    return pageInfo;
  }

}
