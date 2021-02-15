import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ConfigurationService, ModalService, StorageService } from './core/services';
import { AppInfo } from './core/schemas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('whatsNew') template: TemplateRef<any>;
  isLoaded = false;
  appInfo: AppInfo;

  constructor(private configService: ConfigurationService,
              private modal: ModalService,
              private router: Router,
              private storageService: StorageService,
              private titleService: Title,
              private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    // Validate app version and update if needed
    this.configService.updateApp()
      .then(didUpdate => {
        // Set app theme on page load (from config)
        const theme = this.configService.getVal<string>('caravan', 'theme');
        document.documentElement.setAttribute('theme', theme);

        this.appInfo = this.configService.getAppInfo();
        if (didUpdate)
          setTimeout(() => this.modal.openModal(this.template), 500);
      })
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
