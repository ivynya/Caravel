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

  enumerateClasses = true;
  enumerateGroups = false;
  showStudio = true;

  showSettings = false;
  showHelp = false;
  
  constructor(private courseService: CourseService,
              private storage: StorageService,
              private router: Router) { }

  async ngOnInit(): Promise<void> { 
    this.courses = await this.courseService.listCourses();
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
