import { Injectable } from "@angular/core";

import {
	CacheService,
	ConfigurationService,
	NotificationService,
	StorageService,
} from "../..";
import { APIBaseService, ResultHandler } from "../base.service";
import { PlannerOverride } from "../../../schemas";

@Injectable({
	providedIn: "root",
})
export class PlannerService extends APIBaseService {
	constructor(
		cacheService: CacheService,
		configService: ConfigurationService,
		notifService: NotificationService,
		storage: StorageService
	) {
		super("planner", storage, notifService, cacheService, configService);
	}

	// Creates a new PlannerOverride for an item
	setPlannerOverride(
		type: string,
		id: number,
		isComplete: boolean,
		callback: ResultHandler<PlannerOverride>
	): void {
		const qp = {
			plannable_type: type,
			plannable_id: `${id}`,
			marked_complete: `${isComplete}`,
			dismissed: "false",
		};

		this.xfetch<PlannerOverride>(`overrides`, callback, {
			method: "POST",
			params: new URLSearchParams(qp),
		});
	}

	// Updates an existing PlannerOverride with data
	updatePlannerOverride(
		pId: number,
		isComplete: boolean,
		callback: ResultHandler<PlannerOverride>
	): void {
		const qp = {
			marked_complete: `${isComplete}`,
			dismissed: "false",
		};

		this.xfetch<PlannerOverride>(`overrides/${pId}`, callback, {
			method: "PUT",
			params: new URLSearchParams(qp),
		});
	}
}
