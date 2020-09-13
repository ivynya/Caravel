import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService, UserService } from 'app/core/services/canvas';
import { Course } from '../core/services/canvas/course/course';
import { TodoGeneric } from '../core/services/canvas/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: Course[];
  todo: TodoGeneric
  [];

  constructor(private router: Router, 
              private courseService: CourseService,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> { 
    this.courses = await this.courseService.listCourses();
    this.todo = await this.userService.getTodo();
  }

}
