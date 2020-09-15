import { Component, Input, OnInit } from '@angular/core';

import { CourseService } from 'app/core/services/canvas';
import { Course } from 'app/core/services/canvas/course/course';
import { TodoGeneric } from '../../core/services/canvas/user/user';

@Component({
  selector: 'home-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  course: Course;
  @Input() todo: TodoGeneric;

  constructor(private courseService: CourseService) { }

  async ngOnInit(): Promise<void> {
    this.course = await this.courseService.getCourse(this.todo.course_id);
  }

}
