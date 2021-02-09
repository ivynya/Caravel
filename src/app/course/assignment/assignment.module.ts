import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { AssignmentComponent } from './assignment.component';
import { SubmitterComponent } from './submitter/submitter.component';
import { SubmissionComponent } from './submission/submission.component';

@NgModule({
  declarations: [AssignmentComponent, SubmitterComponent, SubmissionComponent],
  imports: [CommonModule, CoreModule, SharedModule]
})
export class AssignmentModule {}
