import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrivateLayoutComponent } from '../shared/layouts';
import { InboxComponent } from './inbox.component';

const routes: Routes = [
  {
    path: 'inbox',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        component: InboxComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
