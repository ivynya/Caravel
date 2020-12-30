
import { NotificationService } from '../notification/notification.service';
import { StorageService } from '../storage/storage.service';

export abstract class APIBaseService {
  
  constructor(private scope: string,
              private storage: StorageService,
              private notifService: NotificationService) {}

  // Fetcher function shared by all API calls
  // Automatically appends CORS proxy & access token
  async fetcher(endpoint: string, method: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.storage.has("oauth_token")) {
        reject("No oauth_token value found.");
        this.notifService.triggerNotification("You are not authorized!", 0);
        return;
      }
      
      // Initiate UI for a long running action
      this.notifService.triggerActionLoading();

      // API is always fetched with a CORS proxy due to Canvas limitations
      // Advisable to set up your own (secure) CORS proxy
      const token = this.storage.get("oauth_token");
      const url = `https://mvla.instructure.com/api/v1/${this.scope}/${endpoint}?access_token=${token}`;
      fetch(`http://localhost:3000/${url}`,
            {
              method: method,
              headers: {
                'accept': 'application/json'
              }
            })
        .then(res => res.text())
        .then(res => {
          // Cache, return, and resolve long running action
          this.cache(endpoint, res);
          resolve(res);
          this.notifService.triggerActionFinished();
          const message = `Updated data at ${new Date().toLocaleTimeString()}.`;
          this.notifService.triggerNotification(message, 2);
        })
        .catch(ex => {
          reject(ex);
          this.notifService.triggerActionFinished();
          // Does a cache exist for the item fetched?
          if (this.getCached(endpoint))
            // The user is seeing stale data. Inform them.
            this.notifService.triggerNotification('You are seeing stale data. It may not be up to date.', 1);
          else
            // Data has failed to load because of a network issue.
            this.notifService.triggerNotification('Failed to get data (network error).', 0);
        });
    });
  }

  // Get cache of an endpoint from storage service
  getCached(endpoint: string): string {
    endpoint = endpoint.replace('/', '.');
    return this.storage.get(`${this.scope}.${endpoint}`);
  }

  private cache(endpoint: string, value: string): void {
    endpoint = endpoint.replace('/', '.');
    this.storage.set(`${this.scope}.${endpoint}`, value);
  }

}
