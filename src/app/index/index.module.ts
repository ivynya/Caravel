import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';

import { IndexComponent } from './index.component';

import { IconModule } from "carbon-components-angular";

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, IndexRoutingModule, IconModule],
  providers: []
})
export class IndexModule {}
