import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CourseService, DiscussionService } from '../../core/services/canvas';
import { Course, DiscussionTopic } from '../../core/schemas';

@Component({
  selector: 'app-course-announcement',
  templateUrl: './course-announcement.component.html',
  styleUrls: ['./course-announcement.component.scss']
})
export class CourseAnnouncementComponent implements OnInit {
  course: Course;
  announcement: DiscussionTopic;
  announcementBody: SafeHtml;

  constructor(private courseService: CourseService,
              private discussionService: DiscussionService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cId = parseInt(this.route.parent.snapshot.paramMap.get("id"));
    this.courseService.getCourse(cId, course => this.course = course);
    this.route.params.subscribe(p => {
      this.discussionService.getTopic(cId, p.tId, d => {
        this.announcement = d.data;
        this.announcementBody = this.sanitizer.bypassSecurityTrustHtml(d.data.message);
      });
    });
  }

}
