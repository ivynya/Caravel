import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { CourseService } from '../../../core/services/canvas';
import { ConfigurationService, StorageService } from '../../../core/services';

import { Course } from '../../../core/schemas';

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
  useCompact = false;

  showHelp = false;
  
  constructor(private courseService: CourseService,
              private storage: StorageService,
              private router: Router,
              private config: ConfigurationService) {
    config.config.subscribe({next: data => {
      this.useCompact = <boolean>data["sidebar"]["compact_mode"].value;
      this.enumerateClasses = <boolean>data["sidebar"]["enumerate_courses"].value;
      this.enumerateGroups = <boolean>data["sidebar"]["enumerate_groups"].value;
    }});
  }

  ngOnInit(): void {
    this.checkAuthAndUpdateInfo();
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd)) return;
      this.checkAuthAndUpdateInfo();
    });
  }

  checkAuthAndUpdateInfo(): void {
    this.isAuthorized = this.storage.has("oauth_token");
    if (!this.isAuthorized) return;

    this.courseService.listCourses(courses => this.courses = courses);
  }

  toggleCompact(): void {
    this.config.set("sidebar", "compact_mode", !this.useCompact);
  }

  toggleHelp(): void {
    this.showHelp = !this.showHelp;
  }
}
