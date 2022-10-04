import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertUrlPipe, MapSubmitTypePipe, RoundDatePipe } from './pipes';

@NgModule({
  declarations: [ConvertUrlPipe, RoundDatePipe, MapSubmitTypePipe],
  imports: [CommonModule],
  exports: [ConvertUrlPipe, RoundDatePipe, MapSubmitTypePipe]
})
export class CoreModule { }
