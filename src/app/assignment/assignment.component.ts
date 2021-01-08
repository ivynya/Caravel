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
      // Get assignment from API/Cache
      this.assignmentService.getAssignment(params.courseId, params.assignmentId,
        assignment => {
          // Set assignment information.
          this.assignment = assignment;
          this.unlimitedAttempts = assignment.allowed_attempts === -1;

          // Get related course
          this.courseService.getCourse(this.assignment.course_id, course => {
            this.course = course;
          });
        });

      // API limitation means that only the latest submission can be
      // retrived. No further submissions, unless admin privileges.
      this.assignmentService.getLatestSubmission(params.courseId, params.assignmentId, submission => {
        this.latestSubmission = submission;
        
        // If no submission, remove viewing option
        if (!submission.posted_at)
          this.isFocusSubmission = false;
      });
    });
  }

  focusSubmission(t: boolean): void {
    this.isFocusSubmission = t;
  }

}
