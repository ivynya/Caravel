import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';

import { CourseComponent } from './course.component';
import { SharedModule } from '../shared/shared.module';

import { RoundDatePipe } from 'app/core/pipes/round-date/round-date.pipe';
import { CourseNavComponent } from './course-nav/course-nav.component';

@NgModule({
  declarations: [CourseComponent, CourseNavComponent],
  imports: [CommonModule, SharedModule, CourseRoutingModule],
  providers: [RoundDatePipe]
})
export class CourseModule {}
