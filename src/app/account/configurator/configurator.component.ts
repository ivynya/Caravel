import { Component, OnInit } from '@angular/core';

import {
  CacheService,
  ConfigurationService,
  NotificationService
} from '../../core/services';
import { AppInfo, Configuration } from '../../core/schemas';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {
  appInfo: AppInfo;
  configuration: Configuration;

  constructor(private cache: CacheService,
              private config: ConfigurationService,
              private notif: NotificationService) { }

  ngOnInit(): void {
    this.config.config.subscribe(data => {
      this.configuration = data;

      // Change app theme if it is updated
      const theme = this.configuration["caravan"]["theme"].value;
      document.documentElement.setAttribute('theme', theme);
    });
    this.appInfo = this.config.getAppInfo();
  }

  // Updates an item in the cache
  upd(scope: string, key: string, val: any): void {
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
    this.notif.notify(`Cleared cache and freed ${freed}KB.`, 2);
  }

  // Reset configuration in localstorage.
  async resetConfig(): Promise<void> {
    await this.config.resetToDefault();
    await this.config.updateApp();
    this.configuration = this.config.getAll();
    this.appInfo = this.config.getAppInfo();
    this.notif.notify('Reset configuration to default.', 2);
  }

}
