import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { CacheItem } from '../../../core/schemas';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage: StorageService) { }

  // Get cache value and age of an endpoint
  getCached(scope: string, endpoint: string): CacheItem | undefined {
    endpoint = endpoint.replace('/', '.').replace('?', '.');
    const item = JSON.parse(this.storage.get(`${scope}.${endpoint}`));
    if (!item) return undefined;
    else return item as CacheItem;
  }

  // Set cache of an endpoint with cache time (number, ms)
  // Optionally includes pagination information (link header, string)
  cache(scope: string, endpoint: string, value: string, pagination?: string): void {
    endpoint = endpoint.replace('/', '.').replace('?', '.');
    const item: CacheItem = { 
      cachedAt: new Date().getTime(),
      link: pagination ?? undefined,
      value: value
    };
    this.storage.set(`${scope}.${endpoint}`, JSON.stringify(item));
  }

  // Clear everything except oauth_token. Return KB freed.
  clear(): number {
    const token = this.storage.get('oauth_token');
    const kbFree = this.storage.clear();
    this.storage.set('oauth_token', token);
    return kbFree;
  }
}
