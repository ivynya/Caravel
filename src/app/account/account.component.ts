import { Component, OnInit } from '@angular/core';

import { CacheService, ConfigurationService, NotificationService } from '../core/services';
import { UserService } from '../core/services/canvas';
import { Configuration, Configurable, Profile } from '../core/schemas';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  configuration: Configuration;
  profile: Profile;
  
  constructor(private cache: CacheService,
              private config: ConfigurationService,
              private notif: NotificationService,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> { 
    this.userService.getProfile(data => this.profile = data);
    this.config.config.subscribe(data => this.configuration = data);
  }

  upd(scope: string, key: string, val: boolean): void {
    this.config.set(scope, key, val);
  }

  // Clear all user cache. Does not sign user out.
  // This resets the user configuration as well.
  async clearCache(): Promise<void> {
    const freed = this.cache.clear();
    await this.config.resetToDefault();
    this.configuration = this.config.getAll();
    this.notif.triggerNotification(`Cleared cache and freed ${freed}KB.`, 2);
  }

  // Reset configuration in localstorage.
  async resetConfig(): Promise<void> {
    await this.config.resetToDefault();
    this.configuration = this.config.getAll();
    this.notif.triggerNotification('Reset configuration to default.', 2);
  }

}
