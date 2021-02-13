import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../core/services/canvas';
import { Course, Page } from '../../core/schemas';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  course: Course;
  page: Page;
  pageBody: SafeHtml;

  constructor(private courseService: CourseService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cId = parseInt(this.route.parent.snapshot.paramMap.get("id"));
    this.courseService.getCourse(cId, course => this.course = course);
    this.route.params.subscribe(p => {
      this.courseService.getCoursePage(cId, p.pId, page => {
        this.page = page;
        this.pageBody = this.sanitizer.bypassSecurityTrustHtml(page.body);
      });
    });
  }

}
