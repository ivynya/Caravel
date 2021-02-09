import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbbreviateCoursePipe } from './pipes/abbreviate-course/abbreviate-course.pipe';
import { RoundDatePipe } from './pipes/round-date/round-date.pipe';
import { MapSubmitTypePipe } from './pipes/map-submit-type/map-submit-type.pipe';

@NgModule({
  declarations: [AbbreviateCoursePipe, RoundDatePipe, MapSubmitTypePipe],
  imports: [
    CommonModule
  ],
  exports: [AbbreviateCoursePipe, RoundDatePipe, MapSubmitTypePipe]
})
export class CoreModule { }
