import { Component, Input } from '@angular/core';

import { Course, DiscussionTopic } from '../../../core/schemas';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent {
  @Input() course: Course;
  @Input() item: DiscussionTopic;

  constructor() { }

}
