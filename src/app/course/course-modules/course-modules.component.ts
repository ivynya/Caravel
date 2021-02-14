import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../core/services/canvas';
import { Course, Module } from '../../core/schemas';

@Component({
  selector: 'app-course-modules',
  templateUrl: './course-modules.component.html',
  styleUrls: ['./course-modules.component.scss']
})
export class CourseModulesComponent implements OnInit {
  course: Course;
  modules: Module[];
  private _modules: Module[][] = [];
  
  constructor(private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.courseService.getCourse(params.id, course => this.course = course);

      this.courseService.listModules(params.id, res => {
        this._modules[res.page] = res.data;
        this.modules = [].concat.apply([], this._modules);

        if (res.pagination?.next)
          res.pagination.next();
      });
    });
  }

  getModuleItems(m: Module): void {
    this.courseService.getModuleItems(this.course.id, m.id, res => {
      if (!m.items) m.items = [];
      m.items[res.page] = res.data;

      if (res.pagination?.next)
        res.pagination.next();
    });
  }

}
