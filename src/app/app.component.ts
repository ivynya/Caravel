import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { StorageService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private storageService: StorageService,
              private titleService: Title,
              private translate: TranslateService,
              private router: Router) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
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
