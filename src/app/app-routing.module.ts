import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationGuard } from './authorization.guard';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CategoryComponent } from './category/category.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { MunicipalStatusComponent } from './municipal-status/municipal-status.component';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: "aboutus",
    component: AboutusComponent
  },
  {
    path: "CandidateForm",
    component: CandidateFormComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: "candidate",
    component: CandidateComponent
  },
  {
    path: "testimonialform",
    component: TestimonialFormComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "contactus",
    component: ContactusComponent
  },
  {
    path: "status",
    component: MunicipalStatusComponent
  },
  {
    path: "auth",
    loadChildren: () => AuthModule
  },
  {
    path: "admin",
    loadChildren: () => AdminModule,
    canActivate: [AuthorizationGuard]
  },
  {
    path: "user",
    loadChildren: () => UserModule,
    canActivate: [AuthorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
