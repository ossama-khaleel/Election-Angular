import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from './shared/shared.module';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { TestimonialComponent } from './testimonial/testimonial.component'
import { CategoryComponent } from './category/category.component';
import { CandidateComponent } from './candidate/candidate.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GovernorateComponent } from './governorate/governorate.component';
import { MunicipalStatusComponent } from './municipal-status/municipal-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    CandidateFormComponent,
    TestimonialFormComponent,
    TestimonialComponent,
    CategoryComponent,
    CandidateComponent,
    GovernorateComponent,
    MunicipalStatusComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SharedModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
