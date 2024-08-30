import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//page de notre site web

import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ExploreComponent } from './component/explore/explore.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id/:nom/:prenom', component: ProfileComponent },
  { path: 'dashboard/:id/:nom/:prenom', component: DashboardComponent },
  { path: 'explore', component: ExploreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
