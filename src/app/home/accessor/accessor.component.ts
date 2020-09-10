import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from '../../core/services/canvas';
import { Course } from '../../core/services/canvas/course/course';

@Component({
  selector: 'home-accessor',
  templateUrl: './accessor.component.html',
  styleUrls: ['./accessor.component.scss']
})
export class AccessorComponent implements OnInit {
  @Input() course: Course;

  constructor(private courseService: CourseService) { }

  async ngOnInit(): Promise<void> {
    console.log(await this.courseService.listExternalTools(this.course.id));
  }

  async func(): Promise<void> {
    console.log(await this.course);
  }
}
