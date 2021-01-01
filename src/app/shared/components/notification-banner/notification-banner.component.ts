import { Component, OnInit } from '@angular/core';
import { C$Notification, C$NotificationType } from '../../../core/schemas';
import { NotificationService } from '../../../core/services';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss']
})
export class NotificationBannerComponent implements OnInit {
  // Number of API calls still loading.
  waitingOn = 0;
  // Notifications to be displayed
  notifs: C$Notification[] = [];
  // CSS-friendly style for current notif.
  notifStyle: string;

  constructor(private notifService: NotificationService) { }

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
      this.notifs.push(notif);
      this.notifStyle = this.convertNotifStyle(this.notifs?.[0].type);

      setTimeout(() => {
        this.notifs.shift();
        if (this.notifs.length > 0)
          this.notifStyle = this.convertNotifStyle(this.notifs?.[0].type);
      }, 3000);
    });
  }

  convertNotifStyle(style: C$NotificationType): string {
    switch (style) {
      case C$NotificationType.Info:
        return 'info';
      case C$NotificationType.Warning:
        return 'warning';
      case C$NotificationType.Error:
      default:
        return 'error';
    }
  }

}