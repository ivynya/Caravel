import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import {
  IconLTIComponent,
  PageNotFoundComponent,
  SidebarComponent
} from './components/';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    IconLTIComponent,
    PageNotFoundComponent,
    SidebarComponent, 
    WebviewDirective
  ],
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule, 
    WebviewDirective, 
    FormsModule,
    IconLTIComponent,
    SidebarComponent
  ]
})
export class SharedModule {}
