import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { AccountRoutingModule } from './account/account-routing.module';
import { CourseRoutingModule } from './course/course-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';

const routes: Routes = [
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
    CourseRoutingModule,
    HomeRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
