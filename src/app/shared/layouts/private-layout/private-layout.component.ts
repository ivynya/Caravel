import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AppInfo, Course } from '../../../core/schemas';

import { ConfigurationService, ModalService, StorageService } from '../../../core/services';
import { CourseService } from '../../../core/services/canvas';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements OnInit {
  @ViewChild('whatsNew') template: TemplateRef<any>;
  isLoaded = false;
  appInfo: AppInfo;

  courses: Course[];

  constructor(private activatedRoute: ActivatedRoute,
              private configService: ConfigurationService,
              private courseService: CourseService,
              private modal: ModalService,
              private router: Router,
              private storageService: StorageService,
              private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    // Validate app version and update if needed
    this.configService.updateApp()
      .then(didUpdate => {
        this.appInfo = this.configService.getAppInfo();
        if (didUpdate)
          setTimeout(() => this.modal.openModal(this.template), 500);
      })
      .then(() => { this.isLoaded = true; });

    // Prompt auth if no token found
    if (!this.storageService.has("oauth_token") &&
        !this.activatedRoute.snapshot.toString().includes("auth"))
      this.router.navigateByUrl("/auth");

    this.courseService.listCourses(c => this.courses = c);
  }

}
