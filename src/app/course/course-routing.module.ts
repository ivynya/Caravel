import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';
import { CourseHomeComponent } from './course-home/course-home.component';
import { CourseModulesComponent } from './course-modules/course-modules.component';
import { AssignmentComponent } from './assignment/assignment.component';

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
        path: 'assignments/:aId',
        component: AssignmentComponent
      },
      {
        path: 'a/:aId',
        redirectTo: 'assignments/:aId'
      },
      {
        path: 'modules',
        component: CourseModulesComponent
      }
    ]
  },
  {
    path: 'c/:id',
    redirectTo: 'courses/:id'
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}
