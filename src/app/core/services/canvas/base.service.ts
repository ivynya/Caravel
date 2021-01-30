
import { 
  CacheService,
  ConfigurationService,
  NotificationService,
  StorageService
} from '../';

// Options for xfetch requests
interface XOptions {
  method?: string,
  params?: URLSearchParams
}
// Result object returned by xfetch
export interface Result {
  data: any,
  isCache: boolean
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
    if (!this.storageService.has("oauth_token")) {
      this.notifService.triggerNotification("You are not authorized!", 0);
      throw new Error("No oauth_token value found.");
    }
    
    // Initiate UI for a long running action
    this.notifService.triggerActionLoading();

    // Return the cached value, if it exists
    const cacheId = options?.params ? `${endpoint}.${options.params}` : endpoint;
    const cachedValue = this.getCached(cacheId);
    if (cachedValue) {
      callback({data: JSON.parse(cachedValue), isCache: true});
    }

    // Get app domain for API calls
    const domain = <string>this.configService.get("caravan", "domain").value;
    if (!domain) {
      this.notifService.triggerNotification("There is a caravan.domain configuration error.", 0);
      return;
    }

    // Construct the endpoint URL
    const token = this.storageService.get("oauth_token");
    const base = `https://${domain}.instructure.com/api/v1`;
    const url = `${base}/${this.scope}/${endpoint}?access_token=${token}&${options?.params}`;
    // API is always fetched with a CORS proxy due to Canvas limitations
    // Advisable to set up your own (secure) CORS proxy
    fetch(`https://cors.sdbagel.com/${url}`,
          {
            method: options?.method ?? "GET",
            headers: { 'accept': 'application/json' }
          })
      .then(res => res.text())
      .then(res => {
        // Cache in localstorage with cacheId
        this.cache(cacheId, res);

        // Resolve action and inform user
        this.notifService.triggerActionFinished();
        const message = `Updated data at ${new Date().toLocaleTimeString()}.`;
        this.notifService.triggerNotification(message, 2);

        // Return the data and denote is fresh
        callback({data: JSON.parse(res), isCache: false});
      })
      .catch(ex => {
        // Resolve long-running action
        this.notifService.triggerActionFinished();

        // Inform user of failure to load or stale data.
        if (cachedValue)
          this.notifService.triggerNotification('You are seeing stale data. It may not be up to date.', 1);
        else
          this.notifService.triggerNotification('Failed to get data (network error).', 0);

        throw new Error(ex);
      });
  }

  // Get cache with caching service
  getCached(endpoint: string): string {
    return this.cacheService.getCached(this.scope, endpoint);
  }

  // Set cache of an endpoint
  private cache(endpoint: string, value: string): void {
    this.cacheService.cache(this.scope, endpoint, value);
  }

}
