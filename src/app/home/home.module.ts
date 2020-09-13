import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { AccessorComponent } from './accessor/accessor.component';
import { TodoComponent } from './todo/todo.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, AccessorComponent, TodoComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
