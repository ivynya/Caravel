import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';
import { CourseHomeComponent } from './course-home/course-home.component';

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
        path: 'modules',
        component: CourseComponent
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
