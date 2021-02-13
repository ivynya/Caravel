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
        path: 'modules',
        component: CourseModulesComponent
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
