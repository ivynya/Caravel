import { Component, Input } from '@angular/core';

import { Course, DiscussionTopic } from '../../../core/schemas';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent {
  @Input() course: Course;
  @Input() item: DiscussionTopic;
  @Input() isAnnouncement = false;

  constructor() { }

}
