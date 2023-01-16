import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InfoComponent } from './info/info.component';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';

const routes: Routes = [  
  {
    path: 'sidebaruser',
    component: SidebarUserComponent
  },
  {
    path: 'editprofile',
    component: EditProfileComponent
  },  
  {
    path: 'info',
    component: InfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
