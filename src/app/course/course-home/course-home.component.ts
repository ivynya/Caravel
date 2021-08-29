import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import {
  ConfigurationService,
  ModalService,
  NotificationService,
  ShortcutService
} from '../../core/services';
import { CourseService, UserService } from '../../core/services/canvas';
import { Course, ExternalTool, PlannerItem, Shortcut, Submission } from '../../core/schemas';

import { RoundDatePipe } from '../../core/pipes';
@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {
  // Determines if redesigned course home is used
  useRedesign = true;
  course: Course;
  recent: Submission[];
  stream: PlannerItem[];
  tools: ExternalTool[];

  // Front page if using legacy home page
  frontPage: SafeHtml;

  // Quick access links and helpers
  shortcuts: Shortcut[] = [];
  @ViewChild('addQuickAccessModal') template: TemplateRef<any>;
  createQAFormURL: string;
  createQAFormName: string;
  createQAFormError: string;

  constructor(private configService: ConfigurationService,
              private courseService: CourseService,
              private modalService: ModalService,
              private notificationService: NotificationService,
              private roundDate: RoundDatePipe,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private shortcutService: ShortcutService,
              private userService: UserService) {
    this.useRedesign = this.configService.getVal<boolean>("course", "use_redesign");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseService.getCourse(params.id, course => this.course = course);
      this.courseService.listCourseRecentSubmissions(params.id, data => {
        this.recent = data.slice(0, 3);
      });

      // Get course stream (max 10 items or 7 days)
      const now = this.roundDate.transform(new Date());
      const loadTo = new Date(now.getTime() + 86400*1000*7);
      this.userService.getCoursePlanner(now, loadTo, `course_${params.id as string}`, data => {
        this.stream = data;
      });

      // Get course external tools
      this.courseService.listExternalTools(params.id, data => this.tools = data);
      this.shortcuts = this.shortcutService.listCourseShortcuts(this.course.id);

      // Course front page is used in legacy mode
      this.courseService.getCourseFrontPage(params.id, page => {
        this.frontPage = this.sanitizer.bypassSecurityTrustHtml(page.body);
      });
    });

    this.shortcutService.shortcuts.subscribe(shortcuts => {
      this.shortcuts = shortcuts[this.course.id];
      console.log(this.shortcuts);
    });
  }

  // Synchronize config with settings here.
  syncConfig(val: boolean): void {
    this.configService.set("course", "use_redesign", val);
  }

  // Open modal to add a quick access item
  openAddQuickAccessModal(): void {
    this.modalService.openModal(this.template);
  }

  // Save new QA Link and close the modal
  addQuickAccessItem(): void {
    if (!this.createQAFormURL || !this.createQAFormName) {
      this.createQAFormError = "Please fill in both fields.";
      return;
    }
    
    this.shortcutService.addShortcut(this.course.id, { 
      name: this.createQAFormName, url: this.createQAFormURL });

    this.createQAFormName = null;
    this.createQAFormURL = null;
    this.createQAFormError = null;

    this.modalService.closeModal();
    this.notificationService.notify("Created shortcut.", 2);
  }

}
