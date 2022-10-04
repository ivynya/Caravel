import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import { SharedModule } from '../shared/shared.module';
import { InboxRoutingModule } from './inbox-routing.module';

@NgModule({
  declarations: [
    InboxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
