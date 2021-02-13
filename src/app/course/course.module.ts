import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';

import { CourseComponent } from './course.component';
import { SharedModule } from '../shared/shared.module';

import { RoundDatePipe } from 'app/core/pipes/round-date/round-date.pipe';
import { CourseNavComponent } from './course-nav/course-nav.component';
import { CourseHomeComponent } from './course-home/course-home.component';
import { CourseModulesComponent } from './course-modules/course-modules.component';
import { CoursePageComponent } from './course-page/course-page.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseNavComponent,
    CourseHomeComponent,
    CourseModulesComponent,
    CoursePageComponent
  ],
  imports: [CommonModule, SharedModule, CourseRoutingModule],
  providers: [RoundDatePipe]
})
export class CourseModule {}
