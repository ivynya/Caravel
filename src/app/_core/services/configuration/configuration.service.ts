import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CacheService } from "../cache/cache.service";
import { StorageService } from "../storage/storage.service";
import { AppInfo, Configurable, Configuration } from "../../schemas";

@Injectable({
	providedIn: "root",
})
export class ConfigurationService {
	// Updated only on app update
	update: Observable<boolean>;
	private _update: BehaviorSubject<boolean>;
	// Updated on user change & app update
	config: Observable<Configuration>;
	private _config: BehaviorSubject<Configuration>;
	private _configuration: Configuration;

	constructor(private cache: CacheService, private storage: StorageService) {
		this._configuration = this.getAll();
		this._config = new BehaviorSubject(this._configuration);
		this.config = this._config.asObservable();

		this._update = new BehaviorSubject(false);
		this.update = this._update.asObservable();
	}

	// Get the entire configurable from scope and key
	get<T>(scope: string, key: string): Configurable<T> | undefined {
		const val = this._configuration[scope][key];
		return val ?? undefined;
	}

	// Get the value of a configurable
	getVal<T>(scope: string, key: string): T {
		return this.get<T>(scope, key).value;
	}

	// Returns the entire app configuration
	getAll(): Configuration {
		return JSON.parse(this.storage.get("config"));
	}

	// Sets a configuration item to a new value
	set(scope: string, key: string, val: any): void {
		this._configuration[scope][key].value = val;
		this._config.next(this._configuration);
		this.storage.set("config", JSON.stringify(this._configuration));
	}

	// Reset configuration to default from web
	async resetToDefault(): Promise<void> {
		return await fetch("/assets/config/config.default.json")
			.then((res) => res.text())
			.then((res) => this.storage.set("config", res))
			.then(() => {
				this._configuration = this.getAll();
				this._config.next(this._configuration);
			});
	}

	getAppInfo(): AppInfo {
		return JSON.parse(this.storage.get("version"));
	}

	showUpdateInfo(): void {
		this._update.next(true);
	}

	async updateApp(): Promise<boolean> {
		// In the event there is no config, reset it.
		if (!this._configuration) await this.resetToDefault();

		// Check against web version of Caravel
		return await fetch("/assets/config/version.json")
			.then((res) => res.text())
			.then(async (res) => {
				// If version mismatch, perform app update
				if (this.storage.get("version") != res) {
					const remoteVersion = JSON.parse(res);
					const localVersion = JSON.parse(this.storage.get("version") ?? "{}");

					// Only refresh config/cache if required
					if (
						localVersion?.version != remoteVersion.previous ||
						localVersion?.version != remoteVersion.version ||
						remoteVersion.requiresRefresh
					) {
						this.cache.clear();
						await this.resetToDefault();
						console.log("[LOG] Performed Caravel app refresh.");
					}

					console.log(`[LOG] Updated Caravel to ${remoteVersion.version}`);
					this._update.next(true);
					this.storage.set("version", res);
					return true;
				} else return false;
			});
	}
}
