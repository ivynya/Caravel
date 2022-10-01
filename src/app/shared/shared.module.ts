import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import {
  DiscussionComponent,
  ExpandableComponent,
  ModuleComponent,
  ModalComponent,
  NotificationBannerComponent,
  OpenFromHereComponent,
  PageNotFoundComponent,
  TodoComponent,
  ToggleComponent
} from './components';

import {
  PrivateLayoutComponent, 
  PublicLayoutComponent
} from './layouts';

import { ButtonModule, HeaderModule, IconModule, ModalModule, NotificationModule } from "carbon-components-angular";

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    ModalComponent,
    ModuleComponent,
    NotificationBannerComponent,
    TodoComponent,
    ToggleComponent,
    ExpandableComponent,
    DiscussionComponent,
    OpenFromHereComponent,
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
    IconModule,
    NotificationModule,
    ModalModule,
    ButtonModule
  ],
  exports: [
    TranslateModule, 
    WebviewDirective, 
    FormsModule,
    ModalComponent,
    ModuleComponent,
    NotificationBannerComponent,
    TodoComponent,
    ToggleComponent,
    ExpandableComponent,
    DiscussionComponent,
    OpenFromHereComponent
  ]
})
export class SharedModule {}
