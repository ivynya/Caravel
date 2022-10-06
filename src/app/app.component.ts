import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationStart, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { IconService } from "carbon-components-angular";
import {
	ArrowUp20,
	ListBulleted20,
	Restart20,
	Bullhorn16,
	Home16,
	Idea16,
	Launch16,
	Link16,
	Overlay16,
	Pen16,
  ArrowRight16,
  Checkmark16,
  Close16,
  Edit16,
  Calendar20,
  DataConnected20,
  Home20,
  ListChecked20,
  MailAll20,
  User20,
} from "@carbon/icons";

import { ConfigurationService } from "./_core/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private config: ConfigurationService,
    private icon: IconService,
    private router: Router,
    private title: Title,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang("en");
  }

  ngOnInit(): void {
		// Registers all icons used by Caravel
    this.icon.registerAll([
			// Home
			ArrowUp20,
			ListBulleted20,
			ListChecked20,
			Restart20,
			// Course navigation
			Bullhorn16,
			Home16,
			Idea16,
			Launch16,
			Link16,
			Overlay16,
			Pen16,
      // Course
      ArrowRight16,
      Checkmark16,
      Close16,
      Edit16,
      // Private layout navicons
      Calendar20,
      DataConnected20,
      Home20,
      ListChecked20,
      MailAll20,
      User20
    ]);

    // Validate app version and update if needed
    this.config.updateApp().then(() => {
      // Set app theme on page load (from config)
      const theme = this.config.getVal<string>("caravel", "theme");
      document.documentElement.setAttribute("theme", theme);

      const accent = this.config.getVal<string>("caravel", "accent");
      document.documentElement.setAttribute("accent", accent);
    });

    // Subscribe to route change for default ops
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationStart)) return;

      // Set default page title
      this.title.setTitle("Caravel");
    });
  }
}
