import { Component, Input, OnInit } from '@angular/core';

import { CourseService } from '../../core/services/canvas';
import { Course, TodoGeneric } from '../../core/schemas';

@Component({
  selector: 'home-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  course: Course;
  @Input() todo?: TodoGeneric;

  constructor(private courseService: CourseService) { }

  async ngOnInit(): Promise<void> {
    if (!this.todo) return;
    this.course = await this.courseService.getCourse(this.todo.course_id);
  }

}
