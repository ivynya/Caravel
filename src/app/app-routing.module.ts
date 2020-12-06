import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { AccountRoutingModule } from './account/account-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { AssignmentRoutingModule } from './assignment/assignment-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    AccountRoutingModule,
    AssignmentRoutingModule,
    HomeRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
