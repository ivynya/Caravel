import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbbreviateCoursePipe } from './pipes/abbreviate-course/abbreviate-course.pipe';
import { RoundDatePipe } from './pipes/round-date/round-date.pipe';
import { MapSubmitTypePipe } from './pipes/map-submit-type/map-submit-type.pipe';
import { AbbreviatePipe } from './pipes/abbreviate/abbreviate.pipe';

@NgModule({
  declarations: [AbbreviateCoursePipe, RoundDatePipe, MapSubmitTypePipe, AbbreviatePipe],
  imports: [
    CommonModule
  ],
  exports: [AbbreviateCoursePipe, RoundDatePipe, MapSubmitTypePipe, AbbreviatePipe]
})
export class CoreModule { }
