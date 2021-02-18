import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService, DiscussionService } from '../../core/services/canvas';
import { Course, DiscussionTopic } from '../../core/schemas';

@Component({
  selector: 'app-course-announcements',
  templateUrl: './course-announcements.component.html',
  styleUrls: ['./course-announcements.component.scss']
})
export class CourseAnnouncementsComponent implements OnInit {
  course: Course;
  announcements: DiscussionTopic[];
  private _announcements: DiscussionTopic[][] = [];
  
  constructor(private courseService: CourseService,
              private discussionService: DiscussionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.courseService.getCourse(params.id, c => this.course = c);

      this.discussionService.listTopics(params.id, true, res => {
        this._announcements[res.page] = res.data;
        this.announcements = [].concat.apply([], this._announcements);

        if (res.pagination?.next)
          res.pagination.next();
      });
    });
  }
}
