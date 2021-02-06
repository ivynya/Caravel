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
import { ToggleComponent } from './components/toggle/toggle.component';
import { ModuleComponent } from './components/module/module.component';

@NgModule({
  declarations: [
    IconLTIComponent,
    PageNotFoundComponent,
    SidebarComponent,
    TodoComponent,
    WebviewDirective,
    NotificationBannerComponent,
    ToggleComponent,
    ModuleComponent
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
    NotificationBannerComponent,
    ToggleComponent,
    ModuleComponent
  ]
})
export class SharedModule {}
