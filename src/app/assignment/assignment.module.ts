import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';

import { AssignmentComponent } from './assignment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AssignmentComponent],
  imports: [CommonModule, SharedModule, AssignmentRoutingModule]
})
export class AssignmentModule {}
