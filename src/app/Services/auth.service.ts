import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import jwtdecode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  
  Login(password: any, ssn: any) {
    const body = {
      ssn: +ssn,
      password: password
    }
    const headerDic = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDic)
    }
    console.log(body);
    this.http.post('https://localhost:44383/api/JWT/Login', body, requestOptions).subscribe((resp: any) => {
      console.log(resp);
      if (resp == "0") {
        this.toastr.warning("Please Verify Your Account");
        this.toastr.warning("Please Check Your Email To verfiy This Account");
      }
      else if (resp == "NotFound") {
        this.toastr.warning('Make Sure You Have An Account');
        this.toastr.error('Password Or SSN Incorrect');
      }
      else {
        const responce = {
          token: resp.toString()
        }
        localStorage.setItem('token', responce.token);
        let data: any = jwtdecode(responce.token);
        localStorage.setItem('user', JSON.stringify({ ...data }));
        if (data.RoleId == '1')
          this.router.navigate(['admin/editprofile']);
        else if (data.RoleId == '2')
          this.router.navigate(['user/editprofile']);
      }
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

}


