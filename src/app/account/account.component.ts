import { Component, OnInit } from "@angular/core";

import {
	CacheService,
	ConfigurationService,
	NotificationService,
	StorageService,
} from "../core/services";
import { UserService } from "../core/services/canvas";
import { AppInfo, Configuration, Profile } from "../core/schemas";

import { Information24 } from "@carbon/icons";
import { IconService } from "carbon-components-angular";

@Component({
	selector: "app-account",
	templateUrl: "./account.component.html",
	styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
	appInfo: AppInfo;
	profile: Profile;
	mobileAuthUrl?: string;

	configuration: Configuration;
	storageUsed: number; // in KB

	showMobileAuthorizer = false;

	constructor(
		private cacheService: CacheService,
		private configService: ConfigurationService,
		private iconService: IconService,
		private notifService: NotificationService,
		private storageService: StorageService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.userService.getProfile((data) => (this.profile = data));
		this.appInfo = this.configService.getAppInfo();
		this.storageUsed = this.storageService.getSize();
		this.iconService.register(Information24);
	}

	openAuthorizer(): void {
		const token = this.storageService.get("oauth_token");
		this.mobileAuthUrl = `https://caravel.sdbagel.com/auth/${token}`;
		this.showMobileAuthorizer = true;
	}

	// Clear all user cache. Does not sign user out.
	async clearCache(): Promise<void> {
		const freed = this.cacheService.clear();
		await this.configService.updateApp();
		this.configuration = this.configService.getAll();
		this.notifService.notify(`Cleared cache and freed ${freed}KB.`, 2);
	}

	// Reset config in localstorage. Does not sign user out.
	async resetConfig(): Promise<void> {
		await this.configService.resetToDefault();
		await this.configService.updateApp();
		this.configuration = this.configService.getAll();
		this.notifService.notify("Reset configuration to default.", 2);
	}
}
