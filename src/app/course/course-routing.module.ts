import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';
import { CourseAnnouncementComponent } from './course-announcement/course-announcement.component';
import { CourseAnnouncementsComponent } from './course-announcements/course-announcements.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { CourseDiscussionsComponent } from './course-discussions/course-discussions.component';
import { CourseHomeComponent } from './course-home/course-home.component';
import { CourseModulesComponent } from './course-modules/course-modules.component';
import { CoursePageComponent } from './course-page/course-page.component';

const routes: Routes = [
  {
    path: 'courses/:id',
    component: CourseComponent,
    children: [
      {
        path: '',
        component: CourseHomeComponent
      },
      {
        path: 'announcements',
        component: CourseAnnouncementsComponent
      },
      {
        path: 'announcements/:tId',
        component: CourseAnnouncementComponent
      },
      {
        path: 'assignments/:aId',
        component: AssignmentComponent
      },
      {
        path: 'discussions',
        component: CourseDiscussionsComponent
      },
      {
        path: 'modules',
        component: CourseModulesComponent
      },
      {
        path: 'pages/:pId',
        component: CoursePageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}
