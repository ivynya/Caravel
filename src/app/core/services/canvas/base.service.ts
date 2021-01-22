
import { CacheService } from '../cache/cache.service';
import { NotificationService } from '../notification/notification.service';
import { StorageService } from '../storage/storage.service';

export abstract class APIBaseService {
  
  constructor(private scope: string,
              private storage: StorageService,
              private notifService: NotificationService,
              private cacheService: CacheService) {}

  // Fetcher function shared by all API calls
  // Automatically appends CORS proxy & access token
  async fetchp(endpoint: string, params: string, method: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.storage.has("oauth_token")) {
        reject("No oauth_token value found.");
        this.notifService.triggerNotification("You are not authorized!", 0);
        return;
      }
      
      // Initiate UI for a long running action
      this.notifService.triggerActionLoading();

      // Construct the endpoint URL.
      const token = this.storage.get("oauth_token");
      const base = `https://mvla.instructure.com/api/v1`;
      const url = `${base}/${this.scope}/${endpoint}?access_token=${token}&${params}`;
      // API is always fetched with a CORS proxy due to Canvas limitations
      // Advisable to set up your own (secure) CORS proxy
      fetch(`https://cors.sdbagel.com/${url}`,
            {
              method: method,
              headers: { 'accept': 'application/json' }
            })
        .then(res => res.text())
        .then(res => {
          // Cache value in localstorage
          this.cache(`${endpoint}.${params}`, res);

          // Resolve action and inform user
          this.notifService.triggerActionFinished();
          const message = `Updated data at ${new Date().toLocaleTimeString()}.`;
          this.notifService.triggerNotification(message, 2);

          resolve(res);
        })
        .catch(ex => {
          // Resolve long-running action
          this.notifService.triggerActionFinished();

          // Inform user of failure to load or stale data.
          if (this.getCached(`${endpoint}.${params}`))
            this.notifService.triggerNotification('You are seeing stale data. It may not be up to date.', 1);
          else
            this.notifService.triggerNotification('Failed to get data (network error).', 0);

          console.error(ex);
        });
    });
  }

  // Backport fetcher without extra url parameters
  async fetcher(endpoint: string, method: string): Promise<string> {
    return this.fetchp(endpoint, "", method);
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
