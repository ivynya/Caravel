import { Injectable } from "@angular/core";

import { APIBaseService } from "../base.service";
import {
	CacheService,
	ConfigurationService,
	NotificationService,
	StorageService,
} from "../../";

import { Assignment, Submission } from "../../../../core/schemas";

@Injectable({
	providedIn: "root",
})
export class AssignmentService extends APIBaseService {
	constructor(
		storage: StorageService,
		notifService: NotificationService,
		cacheService: CacheService,
		configService: ConfigurationService
	) {
		super("courses", storage, notifService, cacheService, configService);
	}

	getAssignment(
		cId: number,
		aId: number,
		callback: (data: Assignment) => void
	): void {
		this.xfetch<Assignment>(
			`${cId}/assignments/${aId}`,
			(res) => {
				callback(res.data);
			},
			{ cacheShort: 30000 }
		).catch((ex) => console.error(ex));
	}

	// Given course, assignment, and user ID, get latest submission
	getLatestSubmission(
		cId: number,
		aId: number,
		callback: (data: Submission) => void
	): void {
		this.xfetch<Submission>(
			`${cId}/assignments/${aId}/submissions/self`,
			(res) => {
				callback(res.data);
			},
			{ cacheShort: 30000 }
		).catch((ex) => console.error(ex));
	}
}
