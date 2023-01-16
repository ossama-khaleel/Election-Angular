import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageMunicipalNameComponent } from './manage-municipal-name/manage-municipal-name.component';
import { ManageMunicipalStatusComponent } from './manage-municipal-status/manage-municipal-status.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { ManageElectiondurationComponent } from './manage-electionduration/manage-electionduration.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageAboutusComponent } from './manage-aboutus/manage-aboutus.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageCandidateComponent } from './manage-candidate/manage-candidate.component';
import { ManagePlacesComponent } from './manage-places/manage-places.component';
import { AllCandidateComponent } from './all-candidate/all-candidate.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { VotedComponent } from './voted/voted.component';
import { ExportAsModule } from 'ngx-export-as';
import { FormsModule } from '@angular/forms';
import { ChartsComponent } from './charts/charts.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ManageAboutComponent } from './manage-about/manage-about.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ManageUsersComponent,
    ManageMunicipalNameComponent,
    ManageMunicipalStatusComponent,
    ProfileComponent,
    ManageElectiondurationComponent,
    ManageTestimonialComponent,
    ManageHomeComponent,
    ManageAboutusComponent,
    ManageContactusComponent,
    ManageCandidateComponent,
    ManagePlacesComponent,
    AllCandidateComponent,
    EditProfileComponent,
    VotedComponent,
    ChartsComponent,
    ManageAboutComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    NgxMaterialTimepickerModule,
    ExportAsModule,
    FormsModule,
    NgxChartsModule
  ]
})
export class AdminModule { }
