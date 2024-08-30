import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';

import { SignupComponent } from './component/signup/signup.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AvisService } from './services/avis.service';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ExploreComponent } from './component/explore/explore.component';

//***Google maps */
import { GoogleMapsModule } from '@angular/google-maps';
import { ReviewSysComponent } from './component/review-sys/review-sys.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    ExploreComponent,
    ReviewSysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
    NgbModule
  ],
  providers: [UserService,AvisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
