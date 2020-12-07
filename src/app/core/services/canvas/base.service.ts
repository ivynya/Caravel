
import { StorageService } from '../storage/storage.service';

export abstract class APIBaseService {
  
  constructor(private scope: string,
              private storage: StorageService) {}

  // Fetcher function shared by all API calls
  // Automatically appends CORS proxy & access token
  async fetcher(endpoint: string, method: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.storage.has("oauth_token"))
        reject("No oauth_token value found.");

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
        .then(res => resolve(res))
        .catch(ex => reject(ex));
    });
  }

}
