import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ConfigurationService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private configService: ConfigurationService,
              private router: Router,
              private titleService: Title,
              private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    // Validate app version and update if needed
    this.configService.updateApp()
      .then(() => {
        // Set app theme on page load (from config)
        const theme = this.configService.getVal<string>('caravel', 'theme');
        document.documentElement.setAttribute('theme', theme);

        const accent = this.configService.getVal<string>('caravel', 'accent');
        document.documentElement.setAttribute('accent', accent);
      })

    // Subscribe to route change for default ops
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationStart)) return;

      // Set default page title
      this.titleService.setTitle("Caravel");
    });
  }
}
