import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, SharedModule, AccountRoutingModule]
})
export class AccountModule {}
