import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ConfigurationService, StorageService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoaded = false;

  constructor(private configService: ConfigurationService,
              private storageService: StorageService,
              private titleService: Title,
              private translate: TranslateService,
              private router: Router) {
    this.translate.setDefaultLang('en');
  }

  async ngOnInit(): Promise<void> {
    // Validate app version and update if needed
    this.configService.updateApp()
      .then(() => { this.isLoaded = true; });

    // Subscribe to route change for default ops
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationStart)) return;

      // Prompt auth if no token found
      if (!this.storageService.has("oauth_token"))
        this.router.navigateByUrl("/auth");

      // Set default page title
      this.titleService.setTitle("Caravan");
    });
  }
}
