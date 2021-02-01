import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from 'app/core/services/canvas';
import { Course, Module } from 'app/core/schemas';

@Component({
  selector: 'app-course-modules',
  templateUrl: './course-modules.component.html',
  styleUrls: ['./course-modules.component.scss']
})
export class CourseModulesComponent implements OnInit {
  course: Course;
  modules: Module[];
  
  constructor(private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.courseService.getCourse(params.id, course => this.course = course);

      this.courseService.listModules(params.id, modules => {
        this.modules = modules;
        console.log(modules);
      });
    });
  }

}