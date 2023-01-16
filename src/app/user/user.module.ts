import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [
    EditProfileComponent,
    SidebarUserComponent,
    ProfileComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
