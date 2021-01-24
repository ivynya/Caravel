import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbbreviateCoursePipe } from './pipes/abbreviate-course/abbreviate-course.pipe';

@NgModule({
  declarations: [AbbreviateCoursePipe],
  imports: [
    CommonModule
  ],
  exports: [AbbreviateCoursePipe]
})
export class CoreModule { }
