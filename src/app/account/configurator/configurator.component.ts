import { Component, OnInit } from '@angular/core';

import {
  CacheService,
  ConfigurationService,
  NotificationService
} from '../../core/services';
import { Configuration } from '../../core/schemas';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {
  appInfo: { version: string };
  configuration: Configuration;

  constructor(private cache: CacheService,
              private config: ConfigurationService,
              private notif: NotificationService) { }

  ngOnInit(): void {
    this.config.config.subscribe(data => this.configuration = data);
    this.appInfo = this.config.getAppInfo();
  }

  // Updates an item in the cache
  upd(scope: string, key: string, val: boolean|string): void {
    this.config.set(scope, key, val);
  }

  // Clear all user cache. Does not sign user out.
  // This resets the user configuration as well.
  async clearCache(): Promise<void> {
    const freed = this.cache.clear();
    await this.config.resetToDefault();
    await this.config.updateApp();
    this.configuration = this.config.getAll();
    this.appInfo = this.config.getAppInfo();
    this.notif.triggerNotification(`Cleared cache and freed ${freed}KB.`, 2);
  }

  // Reset configuration in localstorage.
  async resetConfig(): Promise<void> {
    await this.config.resetToDefault();
    await this.config.updateApp();
    this.configuration = this.config.getAll();
    this.appInfo = this.config.getAppInfo();
    this.notif.triggerNotification('Reset configuration to default.', 2);
  }

}
