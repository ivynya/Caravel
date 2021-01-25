import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage: StorageService) { }

  // Get cache of an endpoint from storage service
  getCached(scope: string, endpoint: string): string {
    endpoint = endpoint.replace('/', '.').replace('?', '.');
    return this.storage.get(`${scope}.${endpoint}`);
  }

  // Set cache of an endpoint with storage service
  cache(scope: string, endpoint: string, value: string): void {
    endpoint = endpoint.replace('/', '.').replace('?', '.');
    this.storage.set(`${scope}.${endpoint}`, value);
  }

  // Clear everything except oauth_token. Return KB freed.
  clear(): number {
    const token = this.storage.get('oauth_token');
    const kbFree = this.storage.clear();
    this.storage.set('oauth_token', token);
    return kbFree;
  }
}
