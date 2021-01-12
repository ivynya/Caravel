import { Component, OnInit } from '@angular/core';

import { CacheService, ConfigurationService, NotificationService } from '../core/services';
import { UserService } from '../core/services/canvas';
import { Profile } from '../core/schemas';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profile: Profile;
  
  constructor(private cache: CacheService,
              private config: ConfigurationService,
              private notif: NotificationService,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> { 
    this.userService.getProfile(data => {
      this.profile = data;
    });
    this.config.resetToDefault();
    console.log(this.config.getAll());
  }

  // Clear all user cache. Does not sign user out.
  // This resets the user configuration as well.
  clearCache(): void {
    const freed = this.cache.clear();
    this.config.resetToDefault();
    this.notif.triggerNotification(`Cleared cache and freed ${freed}KB.`, 2);
  }

  // Reset configuration in localstorage.
  resetConfig(): void {
    this.config.resetToDefault();
    this.notif.triggerNotification('Reset configuration to default.', 2);
  }

}
