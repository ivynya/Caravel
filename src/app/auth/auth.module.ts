import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule, InputModule, TilesModule } from 'carbon-components-angular';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule, TilesModule, ButtonModule, InputModule]
})
export class AuthModule {}
