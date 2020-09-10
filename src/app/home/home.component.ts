import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from 'app/core/services/canvas';
import { Course } from '../core/services/canvas/course/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: Course[];

  constructor(private router: Router, private courseService: CourseService) { }

  async ngOnInit(): Promise<void> { 
    this.courses = await this.courseService.listCourses();
  }

}
