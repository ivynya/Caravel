import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { Configuration } from '../../../core/schemas';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private storage: StorageService) { }

  get(scope: string, key: string): Configuration|undefined {
    const val = this.storage.get(`config.${scope}.${key}`);
    return val ? JSON.parse(val) : undefined;
  }

  getAll(): {[scope: string]: {[key: string]: Configuration} } {
    return JSON.parse(this.storage.get(`config`));
  }

  resetToDefault(): void {
    fetch("/assets/config/config.default.json")
      .then(res => res.text())
      .then(res => this.storage.set('config', res));
  }
  
}
