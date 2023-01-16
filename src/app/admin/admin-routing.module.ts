import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartCommonModule } from '@swimlane/ngx-charts';
import { CandidateFormComponent } from '../candidate-form/candidate-form.component';
import { HomeComponent } from '../home/home.component';
import { TestimonialFormComponent } from '../testimonial-form/testimonial-form.component';
import { AllCandidateComponent } from './all-candidate/all-candidate.component';
import { ChartsComponent } from './charts/charts.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManageAboutComponent } from './manage-about/manage-about.component';

import { ManageAboutusComponent } from './manage-aboutus/manage-aboutus.component';
import { ManageCandidateComponent } from './manage-candidate/manage-candidate.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageElectiondurationComponent } from './manage-electionduration/manage-electionduration.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageMunicipalNameComponent } from './manage-municipal-name/manage-municipal-name.component';
import { ManageMunicipalStatusComponent } from './manage-municipal-status/manage-municipal-status.component';
import { ManagePlacesComponent } from './manage-places/manage-places.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VotedComponent } from './voted/voted.component';

const routes: Routes = [
  {
    path: 'sidebar',
    component: SidebarComponent
  },
  {
    path: 'users',
    component: ManageUsersComponent
  },
  {
    path: 'managemunicipalname',
    component: ManageMunicipalNameComponent
  },
  {
    path: 'managemunicipalstatus',
    component: ManageMunicipalStatusComponent
  },
  {
    path: 'electionduration',
    component: ManageElectiondurationComponent
  },
  {
    path: 'testimonial',
    component: ManageTestimonialComponent
  },
  {
    path: 'home',
    component: ManageHomeComponent
  },
  {
    path: 'aboutus',
    component: ManageAboutusComponent
  },
  {
    path: 'contactus',
    component: ManageContactusComponent
  },
  {
    path: 'candidateform',
    component: ManageCandidateComponent
  },
  {
    path: 'places',
    component: ManagePlacesComponent
  },
  {
    path: 'allcandidate',
    component: AllCandidateComponent
  },
  {
    path: 'editprofile',
    component: EditProfileComponent
  },
  {
    path: 'voted',
    component: VotedComponent
  },
  {
    path: 'chart',
    component: ChartsComponent
  },
  {
    path: 'about',
    component: ManageAboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
