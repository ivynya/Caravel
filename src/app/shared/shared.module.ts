import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import {
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
import { AnnouncementComponent } from './components/announcement/announcement.component';

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
    AnnouncementComponent
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
    AnnouncementComponent
  ]
})
export class SharedModule {}
