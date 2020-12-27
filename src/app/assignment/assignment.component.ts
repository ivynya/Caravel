import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Assignment, Course } from 'app/core/schemas';
import { AssignmentService, CourseService } from 'app/core/services/canvas';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  assignment: Assignment;
  course: Course;

  constructor(private assignmentService: AssignmentService,
              private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.params.subscribe(async params => {
      this.assignment = await this.assignmentService.getAssignment(params.courseId, params.assignmentId);
      console.log(this.assignment);
      this.courseService.getCourse(this.assignment.course_id, course => {
        this.course = course;
      });
    });
  }

}
