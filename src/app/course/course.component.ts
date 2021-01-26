import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../core/services/canvas';
import { Course } from '../core/schemas';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course: Course;

  constructor(private courseService: CourseService,
              private titleService: Title,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseService.getCourse(params.id, course => {
        this.course = course;
        this.titleService.setTitle(`${course.name} | Caravan`);
      });
    });
  }
}
