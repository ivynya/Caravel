import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import {
  IconLTIComponent,
  NotificationBannerComponent,
  PageNotFoundComponent,
  SidebarComponent,
  TodoComponent
} from './components/';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  declarations: [
    IconLTIComponent,
    PageNotFoundComponent,
    SidebarComponent,
    TodoComponent,
    WebviewDirective,
    NotificationBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    CoreModule
  ],
  exports: [
    TranslateModule, 
    WebviewDirective, 
    FormsModule,
    IconLTIComponent,
    SidebarComponent,
    TodoComponent,
    NotificationBannerComponent
  ]
})
export class SharedModule {}
