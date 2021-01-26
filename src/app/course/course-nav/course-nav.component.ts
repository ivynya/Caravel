import { Component, Input } from '@angular/core';
import { Course } from '../../core/schemas';

@Component({
  selector: 'course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.scss']
})
export class CourseNavComponent {
  @Input() course: Course;

  constructor() { }

}
