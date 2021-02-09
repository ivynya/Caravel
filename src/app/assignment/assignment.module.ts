import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';

import { AssignmentComponent } from './assignment.component';
import { SharedModule } from '../shared/shared.module';
import { SubmitterComponent } from './submitter/submitter.component';
import { SubmissionComponent } from './submission/submission.component';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  declarations: [AssignmentComponent, SubmitterComponent, SubmissionComponent],
  imports: [CommonModule, CoreModule, SharedModule, AssignmentRoutingModule]
})
export class AssignmentModule {}
