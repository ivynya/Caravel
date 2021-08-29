
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { SharedModule } from '../shared/shared.module';

import { RoundDatePipe } from '../core/pipes/round-date/round-date.pipe';

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [CommonModule, SharedModule, CoursesRoutingModule],
  providers: [RoundDatePipe]
})
export class CoursesModule {}
