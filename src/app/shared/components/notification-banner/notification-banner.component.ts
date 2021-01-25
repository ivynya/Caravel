import { Component, OnInit } from '@angular/core';

import { C$Notification, C$NotificationType } from '../../../core/schemas';
import { ConfigurationService, NotificationService } from '../../../core/services';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss']
})
export class NotificationBannerComponent implements OnInit {
  // Number of API calls still loading.
  waitingOn = 0;
  // Notification with duration to be displayed
  notifs: [C$Notification, number][] = [];
  // CSS-friendly style for current notif.
  notifStyle: string;

  constructor(private configService: ConfigurationService,
              private notifService: NotificationService) { }

  ngOnInit(): void {
    this.notifService.load.subscribe(isLoad => {
      if (isLoad)
        this.waitingOn++;
      else
        this.waitingOn--;
      
      // This should never happen, but
      // may as well prepare for it.
      if (this.waitingOn < 0)
        this.waitingOn = 0;
    });

    this.notifService.notif.subscribe(notif => {
      // Depending on settings, show critical alerts for 9s vs 3s
      const ext = this.configService.get("notifications", "extend_critical_alerts").value;
      const duration = (ext && notif.type < 2) ? 9000 : 3000;

      this.notifs.push([notif, duration]);
      this.notifStyle = this.convertNotifStyle(this.notifs?.[0][0].type);

      setTimeout(() => {
        this.notifs.shift();
        if (this.notifs.length > 0)
          this.notifStyle = this.convertNotifStyle(this.notifs?.[0][0].type);
      }, duration);
    });
  }

  convertNotifStyle(style: C$NotificationType): string {
    const useCompact = this.configService.get("notifications", "compact_banners").value;
    switch (style) {
      case C$NotificationType.Info:
        if (useCompact) return 'info compact';
        else return 'info';
      case C$NotificationType.Warning:
        return 'warning';
      case C$NotificationType.Error:
      default:
        return 'error';
    }
  }

}
