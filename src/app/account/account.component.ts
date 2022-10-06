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
		private cache: CacheService,
		private config: ConfigurationService,
		private icon: IconService,
		private notification: NotificationService,
		private storage: StorageService,
		private user: UserService
	) {}

	ngOnInit(): void {
		this.user.getProfile((data) => (this.profile = data));
		this.appInfo = this.config.getAppInfo();
		this.storageUsed = this.storage.getSize();
		this.icon.register(Information24);
	}

	openAuthorizer(): void {
		const token = this.storage.get("oauth_token");
		this.mobileAuthUrl = `https://caravel.sdbagel.com/auth/${token}`;
		this.showMobileAuthorizer = true;
	}

	// Clear all user cache. Does not sign user out.
	async clearCache(): Promise<void> {
		const freed = this.cache.clear();
		await this.config.updateApp();
		this.configuration = this.config.getAll();
		this.notification.notify(`Cleared cache and freed ${freed}KB.`, 2);
	}

	// Reset config in localstorage. Does not sign user out.
	async resetConfig(): Promise<void> {
		await this.config.resetToDefault();
		await this.config.updateApp();
		this.configuration = this.config.getAll();
		this.notification.notify("Reset configuration to default.", 2);
	}
}
