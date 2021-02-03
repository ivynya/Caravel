import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage: StorageService) { }

  // Get cache value and age of an endpoint
  getCached(scope: string, endpoint: string): { cachedAt: number, value: string } | undefined {
    endpoint = endpoint.replace('/', '.').replace('?', '.');
    const item = JSON.parse(this.storage.get(`${scope}.${endpoint}`));
    if (!item) return undefined;
    return { cachedAt: item.cachedAt, value: item.value };
  }

  // Set cache of an endpoint with cache time (number, ms)
  cache(scope: string, endpoint: string, value: string): void {
    endpoint = endpoint.replace('/', '.').replace('?', '.');
    this.storage.set(`${scope}.${endpoint}`, 
      JSON.stringify({ cachedAt: new Date().getTime(), value: value }));
  }

  // Clear everything except oauth_token. Return KB freed.
  clear(): number {
    const token = this.storage.get('oauth_token');
    const kbFree = this.storage.clear();
    this.storage.set('oauth_token', token);
    return kbFree;
  }
}
