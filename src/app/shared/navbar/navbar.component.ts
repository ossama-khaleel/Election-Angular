import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router :Router) { }
  logAndreg: boolean = false;
  out: boolean = false;
  ngOnInit(): void {
    this.start();
  }
  DashBoard()
  {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      if(user.RoleId == 1)
      {
        this.router.navigate(['admin/editprofile']);
      }else{
        this.router.navigate(['user/editprofile']);
      }
    }
  }
  logout()
  {
    localStorage.clear();
  }
  start() {
    let user: any = localStorage.getItem('user');
    if (user) {
      this.logAndreg = true;
    }
    else {
      this.out = true;
    }
  }
}
