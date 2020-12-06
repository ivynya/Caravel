import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from 'app/core/services/canvas';
import { Course } from 'app/core/services/canvas/course/course';
import { StorageService } from '../../../core/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  courses: Course[];
  isAuthorized: boolean;

  enumerateClasses = true;
  enumerateGroups = false;
  showStudio = true;

  showSettings = false;
  showHelp = false;
  
  constructor(private courseService: CourseService,
              private storage: StorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isAuthorized = this.storage.has("oauth_token");

      if (this.isAuthorized)
        this.courseService.listCourses()
          .then(courses => this.courses = courses);
    });
  }

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
    this.showHelp = false;
  }

  toggleHelp(): void {
    this.showHelp = !this.showHelp;
    this.showSettings = false;
  }
}
