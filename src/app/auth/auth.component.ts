import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ConfigurationService, StorageService } from "../_core/services";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
	styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
	isMobileAuth = false;
	domain: string;
	token: string;

	constructor(
		private config: ConfigurationService,
		private route: ActivatedRoute,
		private router: Router,
		private storage: StorageService
	) {}

	ngOnInit(): void {
		const token = this.route.snapshot.params.token;
		if (token && token.length > 0 && token.length < 100) {
			this.token = token;
			this.isMobileAuth = true;
		}

		this.domain = this.config.get("canvas", "domain").default as string;
	}

	tryAuthorize(): void {
		// In a real OAuth context, retrieve the token based
		// off of a server running using the developer key.
		this.storage.set("oauth_token", this.token);
		console.log(this.storage.get("oauth_token"));

		// Update institution domain before data load
		this.config.set("canvas", "domain", this.domain);

		// Redirect back
		this.router.navigateByUrl("/home");
	}
}
