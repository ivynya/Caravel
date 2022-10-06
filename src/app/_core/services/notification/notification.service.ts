import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { C$Notification, C$NotificationType } from "../../schemas";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	// Standard notification call
	private _notif = new Subject<C$Notification>();
	notif: Observable<C$Notification>;
	// Denotes when a crtical long-running action is made
	// 'True' = loading, 'False' = completed
	private _load = new Subject<boolean>();
	load: Observable<boolean>;

	constructor() {
		this.notif = this._notif.asObservable();
		this.load = this._load.asObservable();
	}

	// Creates a notification banner with message
	notify(msg: string, type: C$NotificationType): void {
		this._notif.next({ msg: msg, type: type });
	}

	// Notify listeners of a long running action
	triggerActionLoading(): void {
		this._load.next(true);
	}

	// Notify listeners that the action is done
	triggerActionFinished(): void {
		this._load.next(false);
	}
}
