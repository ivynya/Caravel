import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { PublicLayoutComponent } from '../shared/layouts';

const routes: Routes = [
  {
    path: 'auth',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: AuthComponent
      },
      {
        path: ':token',
        component: AuthComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
