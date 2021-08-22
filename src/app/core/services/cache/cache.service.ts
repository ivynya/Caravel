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
    const cacheId = this.sanitize(`.${scope}.${endpoint}`);
    const item = JSON.parse(this.storage.get(cacheId));
    if (!item) return undefined;
    else return item as CacheItem;
  }

  // Set cache of an endpoint with cache time (number, ms)
  // Optionally includes pagination information (link header, string)
  cache(scope: string, endpoint: string, value: string, pagination?: string): void {
    const item: CacheItem = { 
      cachedAt: new Date().getTime(),
      link: pagination ?? undefined,
      value: value
    };
    const cacheId = this.sanitize(`.${scope}.${endpoint}`);
    this.storage.set(cacheId, JSON.stringify(item));
  }

  // Clear storage's cache only. Return KB freed.
  clear(): number {
    let bytesFreed = this.storage.getSize();
    for (const key in this.storage.lstore) {
      if (key.startsWith('.')) this.storage.remove(key);
    }
    bytesFreed -= this.storage.getSize();
    return bytesFreed;
  }

  // replace all non-alphanumeric characters with a single dot
  private sanitize(str: string): string {
    return str.replace(/[^a-z0-9]/gi, '.').replace(/\.\.+/g, '.');
  }
}
