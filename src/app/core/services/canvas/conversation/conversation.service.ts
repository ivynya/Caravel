import { Injectable } from "@angular/core";

import { APIBaseService } from "../base.service";
import {
	CacheService,
	ConfigurationService,
	NotificationService,
	StorageService,
} from "../..";

@Injectable({
	providedIn: "root",
})
export class ConversationService extends APIBaseService {
	constructor(
		storage: StorageService,
		notifService: NotificationService,
		cacheService: CacheService,
		configService: ConfigurationService
	) {
		super("courses", storage, notifService, cacheService, configService);
	}

	
}
