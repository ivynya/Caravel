import { Component, Input, OnInit } from '@angular/core';

import { AssignmentService, CourseService } from '../../../core/services/canvas';
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
  isLocked = false;

  constructor(private assignmentService: AssignmentService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourse(this.item.course_id, course => {
      this.course = course;
    });

    if (this.item.submissions.submitted ||
        this.item.submissions.graded ||
        this.item.planner_override?.dismissed ||
        this.item.planner_override?.marked_complete ||
        this.item.plannable?.workflow_state === "completed")
      this.isComplete = true;

    if (this.item.plannable_type === 'assignment')
      this.assignmentService.getAssignment(this.item.course_id, this.item.plannable.id, a => {
        this.isLocked = a.locked_for_user;
      });
    else if (this.item.plannable_type === 'wiki_page')
      this.courseService.getCoursePage(this.item.course_id, this.item.plannable.url, p => {
        this.isLocked = p.locked_for_user;
      });
  }

}
