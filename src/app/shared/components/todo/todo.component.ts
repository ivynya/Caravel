import { Component, Input, OnInit } from '@angular/core';

import { CourseService } from '../../../core/services/canvas';
import { Course, PlannerItem } from '../../../core/schemas';

@Component({
  selector: 'home-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  course: Course;
  @Input() item: PlannerItem;

  isComplete = false;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourse(this.item.course_id, course => {
      this.course = course;
    });

    if (this.item.submissions.submitted ||
        this.item.submissions.graded ||
        this.item.planner_override?.dismissed ||
        this.item.planner_override?.marked_complete)
      this.isComplete = true;
  }

}
