import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Assignment, Course, Submission } from '../core/schemas';
import { AssignmentService, CourseService } from '../core/services/canvas';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  assignment: Assignment;
  course: Course;

  latestSubmission: Submission;
  unlimitedAttempts: boolean;
  isFocusSubmission = true;

  constructor(private assignmentService: AssignmentService,
              private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.params.subscribe(params => {
      // Get assignment from API/Cache
      this.assignmentService.getAssignment(params.cId, params.aId, a => this.setAssignment(a));

      // API limitation means that only the latest submission can be
      // retrived. No further submissions, unless admin privileges.
      this.assignmentService.getLatestSubmission(params.cId, params.aId, submission => {
        this.latestSubmission = submission;
        
        // If no submission, remove viewing option
        if (!submission.submitted_at)
          this.isFocusSubmission = false;
      });
    });
  }

  private setAssignment(assignment: Assignment): void {
    // Set assignment information.
    this.assignment = assignment;
    this.unlimitedAttempts = (assignment.allowed_attempts === -1);

    // Get related course
    this.courseService.getCourse(this.assignment.course_id, course => this.course = course);
  }

  focusSubmission(t: boolean): void {
    this.isFocusSubmission = t;
  }

}
