import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { Configurable, Configuration } from '../../../core/schemas';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  config: Observable<Configuration>;
  private _config: BehaviorSubject<Configuration>;
  private _configuration: Configuration;

  constructor(private storage: StorageService) { 
    this._configuration = this.getAll();
    this._config = new BehaviorSubject(this._configuration);
    this.config = this._config.asObservable();
  }

  get(scope: string, key: string): Configurable|undefined {
    const val = this._configuration[scope][key];
    return val ?? undefined;
  }

  getAll(): Configuration {
    return JSON.parse(this.storage.get('config'));
  }

  set(scope: string, key: string, val: boolean|string): void {
    this._configuration[scope][key].value = val;
    this._config.next(this._configuration);
    this.storage.set('config', JSON.stringify(this._configuration));
  }

  async resetToDefault(): Promise<void> {
    return await fetch("/assets/config/config.default.json")
      .then(res => res.text())
      .then(res => this.storage.set('config', res))
      .then(() => {
        this._configuration = this.getAll();
        this._config.next(this._configuration);
      });
  }
  
}
