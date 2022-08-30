import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import {
  BrandBadgeComponent,
  DiscussionComponent,
  ExpandableComponent,
  IconLTIComponent,
  ModuleComponent,
  ModalComponent,
  NotificationBannerComponent,
  OpenFromHereComponent,
  PageNotFoundComponent,
  SidebarComponent,
  TodoComponent,
  ToggleComponent
} from './components';

import {
  PrivateLayoutComponent, 
  PublicLayoutComponent
} from './layouts';

import { HeaderModule, IconModule } from "carbon-components-angular";

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

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
    OpenFromHereComponent,
    BrandBadgeComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    CoreModule,
    HeaderModule,
    IconModule
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
    OpenFromHereComponent,
    BrandBadgeComponent
  ]
})
export class SharedModule {}
