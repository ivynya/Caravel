import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Assignment, Course, SessionlessLaunch, Submission } from '../../core/schemas';
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

  ltiLauncher: SessionlessLaunch // if external_tool & lti launch

  // True if possibility that assignment can be graded.
  isAssignmentGraded = true;

  latestSubmission: Submission;
  unlimitedAttempts: boolean;

  constructor(private assignmentService: AssignmentService,
              private courseService: CourseService,
              private sanitizer: DomSanitizer,
              private titleService: Title,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cId = parseInt(this.route.parent.snapshot.paramMap.get("id"));
    this.route.params.subscribe(p => {
      // Get assignment from API/Cache
      this.assignmentService.getAssignment(cId, p.aId, a => this.setAssignment(cId, a));
    });
  }

  private setAssignment(cId: number, assignment: Assignment): void {
    // Set assignment information.
    this.assignment = assignment;
    this.assignmentBody = this.sanitizer.bypassSecurityTrustHtml(assignment.description);
    this.isAssignmentGraded = assignment.submission_types.join() !== 'not_graded';
    this.titleService.setTitle(`${assignment.name} | Caravel`);

    // If LTI, generate link
    if (assignment.url && assignment.external_tool_tag_attributes) {
      this.courseService.getExternalSessionlessLaunch(cId, assignment.id, "assessment", res => {
        this.ltiLauncher = res;
      })
    }

    // Get related course
    this.courseService.getCourse(cId, course => this.course = course);

    // Only get submissions if the assignment is graded.
    if (this.isAssignmentGraded) {
      // TODO: Refactor to Submissions API
      this.assignmentService.getLatestSubmission(cId, assignment.id, s => {
        this.latestSubmission = s;
      });
  
      // -1 attempts denotes unlimited submissions possible.
      this.unlimitedAttempts = assignment.allowed_attempts === -1;
    }
  }

}
