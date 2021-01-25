import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbbreviateCoursePipe } from './pipes/abbreviate-course/abbreviate-course.pipe';
import { RoundDatePipe } from './pipes/round-date/round-date.pipe';

@NgModule({
  declarations: [AbbreviateCoursePipe, RoundDatePipe],
  imports: [
    CommonModule
  ],
  exports: [AbbreviateCoursePipe, RoundDatePipe]
})
export class CoreModule { }
