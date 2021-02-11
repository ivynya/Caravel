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
  useCompact = false;

  ttOffset = 90;
  
  constructor(private courseService: CourseService,
              private storage: StorageService,
              private router: Router,
              private config: ConfigurationService) {
    config.config.subscribe({next: data => {
      this.useCompact = <boolean>data["sidebar"]["compact_mode"].value;
      this.enumerateClasses = <boolean>data["sidebar"]["enumerate_courses"].value;
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
    const token = this.storage.get("oauth_token");
    this.isAuthorized = (token && token !== "null");
    if (!this.isAuthorized) {
      this.router.navigateByUrl("/auth");
      return;
    }

    this.courseService.listCourses(courses => this.courses = courses);
  }

  toggleCompact(): void {
    this.config.set("sidebar", "compact_mode", !this.useCompact);
  }

  // On navlink hover, align the tooltip position to element
  alignTT(e: MouseEvent): void {
    const target = e.currentTarget as HTMLElement;
    const top = target.getBoundingClientRect().top;
    this.ttOffset = top + 0.5*target.offsetHeight - 18;
  }
}
