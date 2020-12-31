import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Assignment, Course, Submission } from 'app/core/schemas';
import { AssignmentService, CourseService } from 'app/core/services/canvas';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  assignment: Assignment;
  latestSubmission: Submission;
  unlimitedAttempts: boolean;
  isFocusSubmission = true;

  course: Course;

  constructor(private assignmentService: AssignmentService,
              private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.params.subscribe(async params => {
      this.assignment = await this.assignmentService.getAssignment(params.courseId, params.assignmentId);
      this.unlimitedAttempts = this.assignment.allowed_attempts === -1;

      // API limitation means that only the latest submission can be
      // retrived. No further submissions, unless admin privileges.
      this.assignmentService.getLatestSubmission(params.courseId, params.assignmentId, submission => {
        this.latestSubmission = submission;
      });

      // Get related course
      this.courseService.getCourse(this.assignment.course_id, course => {
        this.course = course;
      });
    });
  }

  focusSubmission(t: boolean): void {
    this.isFocusSubmission = t;
  }

}
