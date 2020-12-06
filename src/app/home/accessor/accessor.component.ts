import { Component, OnInit, Input } from '@angular/core';

import { CourseService } from '../../core/services/canvas';
import { Course, ExternalTool } from '../../core/services/canvas/course/course';

@Component({
  selector: 'home-accessor',
  templateUrl: './accessor.component.html',
  styleUrls: ['./accessor.component.scss']
})
export class AccessorComponent implements OnInit {
  @Input() course: Course;
  integrations: ExternalTool[];

  constructor(private courseService: CourseService) { }

  async ngOnInit(): Promise<void> {
    this.integrations = await this.courseService.listExternalTools(this.course.id);
  }
}
