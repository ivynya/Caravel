import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Course, ExternalTool, Shortcut } from '../../core/schemas';
import { ModalService, NotificationService, ShortcutService } from '../../core/services';
import { CourseService } from '../../core/services/canvas';

@Component({
  selector: 'course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.scss']
})
export class CourseNavComponent implements OnInit {
  @Input() course: Course;
  shortcuts: Shortcut[];
  tools: ExternalTool[];

  // Shortcut add helper
  @ViewChild('addQuickAccessModal') template: TemplateRef<any>;
  createQAFormURL: string;
  createQAFormName: string;
  createQAFormError: string;

  constructor(private courseService: CourseService,
              private modalService: ModalService,
              private notificationService: NotificationService,
              private shortcutService: ShortcutService) { }

  ngOnInit(): void {
    this.courseService.listExternalTools(this.course.id, data => this.tools = data);
    this.shortcuts = this.shortcutService.listCourseShortcuts(this.course.id);

    this.shortcutService.shortcuts.subscribe(shortcuts => {
      this.shortcuts = shortcuts[this.course.id];
    });
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
