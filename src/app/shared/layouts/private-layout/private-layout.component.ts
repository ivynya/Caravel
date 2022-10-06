import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { AppInfo, Course } from "../../../core/schemas";

import { ConfigurationService, StorageService } from "../../../core/services";
import { CourseService } from "../../../core/services/canvas";

@Component({
	selector: "app-private-layout",
	templateUrl: "./private-layout.component.html",
	styleUrls: ["./private-layout.component.scss"],
})
export class PrivateLayoutComponent implements OnInit {
	isLoaded = false;
	appInfo: AppInfo;
	showWhatsNew = false;

	courses: Course[];

  items = [];
  model: string;
  data: any;

	constructor(
		private activatedRoute: ActivatedRoute,
		private configService: ConfigurationService,
		private courseService: CourseService,
		private router: Router,
		private storageService: StorageService,
		private translate: TranslateService
	) {
		this.translate.setDefaultLang("en");
	}

	ngOnInit(): void {
		for (const key in this.storageService.lstore) {
			if (key.startsWith(".")) this.items.push({
        content: key,
        selected: false
      });
		}

		// Validate app version and update if needed
		this.configService
			.updateApp()
			.then((didUpdate) => {
				this.appInfo = this.configService.getAppInfo();
				if (didUpdate) this.showWhatsNew = true;
			})
			.then(() => {
				this.isLoaded = true;
			});

		// Prompt auth if no token found
		if (
			!this.storageService.has("oauth_token") &&
			!this.activatedRoute.snapshot.toString().includes("auth")
		)
			this.router.navigateByUrl("/auth");

		this.courseService.listCourses((c) => (this.courses = c));
	}

  changed(): void {
    this.data = JSON.parse(JSON.parse(this.storageService.get(this.model))?.value);
  }
}
