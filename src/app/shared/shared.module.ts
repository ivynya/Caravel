import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import {
  DiscussionComponent,
  ExpandableComponent,
  IconLTIComponent,
  ModuleComponent,
  ModalComponent,
  NotificationBannerComponent,
  PageNotFoundComponent,
  SidebarComponent,
  TodoComponent,
  ToggleComponent
} from './components/';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'app/core/core.module';
import { OpenFromHereComponent } from './components/open-from-here/open-from-here.component';

@NgModule({
  declarations: [
    IconLTIComponent,
    PageNotFoundComponent,
    WebviewDirective,
    ModalComponent,
    ModuleComponent,
    NotificationBannerComponent,
    SidebarComponent,
    TodoComponent,
    ToggleComponent,
    ExpandableComponent,
    DiscussionComponent,
    OpenFromHereComponent
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
    ModalComponent,
    ModuleComponent,
    NotificationBannerComponent,
    SidebarComponent,
    TodoComponent,
    ToggleComponent,
    ExpandableComponent,
    DiscussionComponent,
    OpenFromHereComponent
  ]
})
export class SharedModule {}
