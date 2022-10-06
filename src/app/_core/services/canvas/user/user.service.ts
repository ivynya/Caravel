import { Injectable } from "@angular/core";

import { APIBaseService, ResultHandler } from "../base.service";
import {
	CacheService,
	ConfigurationService,
	NotificationService,
	StorageService,
} from "../..";
import { Assignment, PlannerItem, Profile } from "../../../schemas";

@Injectable({
	providedIn: "root",
})
export class UserService extends APIBaseService {
	constructor(
		storage: StorageService,
		notifService: NotificationService,
		cacheService: CacheService,
		configService: ConfigurationService
	) {
		super("users", storage, notifService, cacheService, configService);
	}

	// Lists assignments for user in a course
	listAssignments(cId: number, callback: ResultHandler<Assignment[]>): void {
		this.xfetch<Assignment[]>(`self/courses/${cId}/assignments`, callback, {
			cacheShort: 30000,
		}).catch((ex) => console.error(ex));
	}

	// Gets user planner items (assignments, events, etc.)
	getPlanner(
		start: Date,
		end: Date,
		callback: ResultHandler<PlannerItem[]>
	): void {
		const qp = {
			start_date: start.toISOString(),
			end_date: end.toISOString(),
		};

		this.xfetch<PlannerItem[]>(`self/planner/items`, callback, {
			params: new URLSearchParams(qp),
			cacheShort: 5000,
		}).catch((ex) => console.error(ex));
	}

	// Gets user planner items for specified courses/groups
	getCoursePlanner(
		start: Date,
		end: Date,
		codes: string,
		callback: (data: PlannerItem[]) => void
	): void {
		const qp = {
			start_date: start.toISOString(),
			end_date: end.toISOString(),
			context_codes: codes,
		};

		this.xfetch<PlannerItem[]>(
			`self/planner/items`,
			(res) => {
				callback(res.data);
			},
			{ params: new URLSearchParams(qp) }
		).catch((ex) => console.error(ex));
	}

	// Gets user profile. Used on accounts page.
	getProfile(callback: (data: Profile) => void): void {
		this.xfetch<Profile>(
			`self/profile`,
			(res) => {
				callback(res.data);
			},
			{ cacheShort: 360000000, cacheLong: 864000000 }
		).catch((ex) => console.error(ex));
	}

	setCourseNickname(
		cId: number,
		nickname: string,
		callback: (data: any) => void
	): void {
		this.xfetch<any>(
			`self/course_nicknames/${cId}`,
			(res) => {
				callback(res.data);
			},
			{ method: "PUT", params: new URLSearchParams({ nickname }) }
		).catch((ex) => console.error(ex));
	}

	deleteCourseNickname(cId: number, callback: (data: any) => void): void {
		this.xfetch<any>(
			`self/course_nicknames/${cId}`,
			(res) => {
				callback(res.data);
			},
			{ method: "DELETE" }
		).catch((ex) => console.error(ex));
	}
}
