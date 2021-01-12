import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  lstore: Storage;

  constructor() {
    this.lstore = window.localStorage;
  }

  has(key: string): boolean {
    return this.lstore.getItem(key) ? true : false;
  }

  get(key: string): string {
    return this.lstore.getItem(key);
  }

  set(key: string, value: string): void {
    this.lstore.setItem(key, value);
  }

  // Clear storage and return KB freed.
  clear(): number {
    const bytes = JSON.stringify(this.lstore).length;
    this.lstore.clear();
    return Math.round(bytes / 1000);
  }
}
