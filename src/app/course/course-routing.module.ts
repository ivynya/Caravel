import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';

const routes: Routes = [
  {
    path: 'courses/:id',
    component: CourseComponent
  },
  {
    path: 'c/:id',
    component: CourseComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}
