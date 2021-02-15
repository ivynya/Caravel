import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Assignment, Course, Submission } from '../../core/schemas';
import { AssignmentService, CourseService } from '../../core/services/canvas';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  assignment: Assignment;
  assignmentBody: SafeHtml;
  course: Course;

  latestSubmission: Submission;
  unlimitedAttempts: boolean;
  isFocusSubmission = true;

  constructor(private assignmentService: AssignmentService,
              private courseService: CourseService,
              private sanitizer: DomSanitizer,
              private titleService: Title,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const courseId = parseInt(this.route.parent.snapshot.paramMap.get("id"));
    this.route.params.subscribe(params => {
      // Get assignment from API/Cache
      this.assignmentService.getAssignment(courseId, params.aId, a => this.setAssignment(a));

      // API limitation means that only the latest submission can be
      // retrived. No further submissions, unless admin privileges.
      this.assignmentService.getLatestSubmission(courseId, params.aId, submission => {
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
    this.assignmentBody = this.sanitizer.bypassSecurityTrustHtml(assignment.description);
    this.unlimitedAttempts = (assignment.allowed_attempts === -1);
    this.titleService.setTitle(`${assignment.name} | Caravan`);

    // Get related course
    this.courseService.getCourse(this.assignment.course_id, course => this.course = course);
  }

  focusSubmission(t: boolean): void {
    this.isFocusSubmission = t;
  }

}