import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { InputModule, SelectModule, TilesModule } from 'carbon-components-angular';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [AccountComponent, ConfiguratorComponent],
  imports: [CommonModule, SharedModule, QRCodeModule, AccountRoutingModule, TilesModule, InputModule, SelectModule]
})
export class AccountModule {}
