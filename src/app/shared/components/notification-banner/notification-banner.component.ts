import { Component, OnInit } from "@angular/core";

import { C$Notification, C$NotificationType } from "../../../core/schemas";
import {
	ConfigurationService,
	NotificationService,
} from "../../../core/services";

@Component({
	selector: "app-notification-banner",
	templateUrl: "./notification-banner.component.html",
	styleUrls: ["./notification-banner.component.scss"],
})
export class NotificationBannerComponent implements OnInit {
	// Number of API calls still loading.
	waitingOn = 0;
	// Last notification style string
	bannerStyle: string;
	// Notifications to be displayed
	notifs: {
		notif: C$Notification;
		duration: number;
		style: string;
	}[] = [];

	constructor(
		private configService: ConfigurationService,
		private notifService: NotificationService
	) {}

	ngOnInit(): void {
		this.notifService.load.subscribe((isLoad) => {
			if (isLoad) this.waitingOn++;
			else this.waitingOn--;

			// Inform user long running actions are complete
			if (this.waitingOn === 0)
				this.notifService.notify("Resolved actions.", 2);

			// Should never happen.
			if (this.waitingOn < 0) this.waitingOn = 0;
		});

		this.notifService.notif.subscribe((notif) => {
			// Reject duplicate notifications
			if (this.notifs.find((n) => n.notif.msg === notif.msg)) return;

			// Depending on settings, show critical alerts for 9s vs 3s
			const ext = this.configService.get(
				"notifications",
				"extend_critical_alerts"
			).value;
			const duration = ext && notif.type < 2 ? 9000 : 3000;

			// Add notification to display queue
			this.notifs.push({
				notif: notif,
				duration: duration,
				style: this.convertNotifStyle(notif.type),
			});

			// Start the notification cycle function
			if (this.notifs.length === 1) this.displayNextNotif();
		});
	}

	// Cycles through notifications until none left
	displayNextNotif(): void {
		this.bannerStyle = this.notifs[0].style;

		setTimeout(() => {
			this.notifs.shift();
			if (this.notifs.length > 0) this.displayNextNotif();
		}, this.notifs[0]?.duration);
	}

	// Converts a notification type enum to string
	convertNotifStyle(style: C$NotificationType): string {
		//const useCompact = this.configService.get("notifications", "compact_banners").value;
		switch (style) {
			case C$NotificationType.Info:
				return "info";
			case C$NotificationType.Warning:
				return "warning";
			case C$NotificationType.Error:
			default:
				return "error";
		}
	}
}
