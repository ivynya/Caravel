import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angular2-qrcode';

import { AccountRoutingModule } from './account-routing.module';

import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { ConfiguratorComponent } from './configurator/configurator.component';

@NgModule({
  declarations: [AccountComponent, ConfiguratorComponent],
  imports: [CommonModule, SharedModule, QRCodeModule, AccountRoutingModule]
})
export class AccountModule {}
