import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import {
  AssignmentService,
  CourseService,
  PlannerService
} from '../../../core/services/canvas';
import { ModalService } from '../../../core/services';
import { Course, PlannerItem } from '../../../core/schemas';

@Component({
  selector: 'home-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  course: Course;
  @Input() item: PlannerItem;
  @Input() selectable = true;

  isComplete = false;
  isLocked = false;

  // Events open information in a modal.
  @ViewChild('eventModal', { static: true }) template?: TemplateRef<any>;

  constructor(private assignmentService: AssignmentService,
              private courseService: CourseService,
              private modalService: ModalService,
              private plannerService: PlannerService) { }

  ngOnInit(): void {
    this.courseService.getCourse(this.item.course_id, c => this.course = c);
    
    // Set completion status based off of item
    if (this.item.submissions.excused ||
        this.item.submissions.graded ||
        this.item.submissions.submitted ||
        this.item.plannable?.workflow_state === "completed")
      this.isComplete = true;

    // If a planner override exists, it takes precedence
    if (this.item.planner_override)
      this.isComplete = this.item.planner_override.marked_complete;

    // Check if item is locked for user
    if (this.item.plannable_type === 'assignment')
      this.assignmentService.getAssignment(this.item.course_id, this.item.plannable.id, a => {
        this.isLocked = a.locked_for_user;
      });
    else if (this.item.plannable_type === 'wiki_page')
      this.courseService.getCoursePage(this.item.course_id, this.item.plannable.url, p => {
        this.isLocked = p.locked_for_user;
      });
  }

  // Updates or sets a planner override on the item
  toggleDismissed(): void {
    if (this.item.planner_override)
      this.plannerService.updatePlannerOverride(
        this.item.planner_override.id,
        !this.item.planner_override.marked_complete,
        res => { console.log(res); });
    else
      this.plannerService.setPlannerOverride(
        this.item.plannable_type,
        this.item.plannable_id,
        true, res => {console.log(res)});
  }

  openModal(): void {
    if (this.template)
      this.modalService.openModal(this.template);
  }

}
