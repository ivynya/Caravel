import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService, UserService } from '../core/services/canvas';
import { Course, Page, PlannerItem } from '../core/schemas';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  // Determines if redesigned course home is used
  useRedesign = true;
  course: Course;
  stream: PlannerItem[];

  // Front page if using legacy home page
  frontPage: Page;

  constructor(private courseService: CourseService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseService.getCourse(params.id, course => this.course = course);


      let now = new Date();
      now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let loadTo = new Date(now.getTime() + 86400*1000*7);
      this.userService.getCoursePlanner(now, loadTo, `course_${params.id}`, data => {
        this.stream = data;
      });

      this.courseService.getCourseFrontPage(params.id, page => this.frontPage = page);
    });
  }

}
