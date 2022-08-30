import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';

import { IndexComponent } from './index.component';
import { SharedModule } from '../shared/shared.module';

import {HeaderModule, IconModule, SearchModule } from "carbon-components-angular";

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, SharedModule, IndexRoutingModule, HeaderModule, IconModule, SearchModule],
  providers: []
})
export class IndexModule {}
