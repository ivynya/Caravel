import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotificationService } from 'app/core/services';
import { Submission } from '../../core/schemas';

@Component({
  selector: 'assignment-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnChanges {
  @Input() submission: Submission;
  previewUrl: SafeResourceUrl;
  type: string;

  constructor(private sanitizer: DomSanitizer,
              private notif: NotificationService) { }

  ngOnChanges(): void {
    this.type = this.convertTypeToReadable(this.submission?.submission_type);
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.submission?.preview_url);
  }

  convertTypeToReadable(type: string): string {
    switch (type) {
      case 'online_text_entry':
        return 'Online Text Upload';
      case 'online_url':
        return 'Web URL';
      case 'online_upload':
        return 'File Upload';
      case 'media_recording':
        return 'Media Recording';
      default:
        return 'Unknown';
    }
  }

  long(): void {
    this.notif.triggerActionLoading();
  }

  resolve(): void {
    this.notif.triggerActionFinished();
  }

  num = 0;
  notify(): void {
    this.notif.triggerNotification("Notification "+this.num, 0);
    this.num++;
  }

}
