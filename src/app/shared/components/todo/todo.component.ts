import { Component, Input, OnInit } from '@angular/core';

import { CourseService } from '../../../core/services/canvas';
import { Course, TodoEvent, TodoAssignment } from '../../../core/schemas';

@Component({
  selector: 'home-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  course: Course;
  @Input() todo?: TodoAssignment|TodoEvent;
  private isEvent = false;

  constructor(private courseService: CourseService) { }

  async ngOnInit(): Promise<void> {
    if (!this.todo) return;

    let todo = this.todo as TodoEvent;
    if (todo.location_name)
      this.isEvent = true;

    if (!this.isEvent)
      this.courseService.getCourse((<TodoAssignment>this.todo).assignment?.course_id, course => {
        this.course = course;
      });
  }

}
