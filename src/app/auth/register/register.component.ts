import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  password = new FormControl('', [Validators.required, Validators.minLength(10)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phonenumber = new FormControl('', [Validators.required, Validators.minLength(10)]);
  img = new FormControl('', Validators.required,);

  // const emailBody = {
  //   Id: resp.id,
  //   Email: this.email.value
  // }
  // this.http.post('https://localhost:44383/api/EmailMessage/EmailSender', emailBody).subscribe((resp: any) => {
  //   this.toastr.success("Verify Your Account Check Your Email")
  // }, err => {
  //   this.toastr.error(err.message, err.status)
  // })
  ngOnInit(): void {
  }
  Register() {

    if (this.home.ssn == undefined) {
      this.toastr.warning("Check Image Plesae crop it right")
    }
    else {
      this.spinner.show();
      this.http.get('https://localhost:44383/api/user/reg/' + this.home.ssn).subscribe((resp: any) => {
        if (resp != null) {
          console.log(resp);
          const body: any = {
            firstname: resp.firstname,
            lastname: resp.lastname,
            ssn: resp.ssn,
            password: this.password.value,
            userimagepath: resp.userimagepath,
            email: this.email.value,
            userinfoid: resp.id,
            phonenumber: this.phonenumber.value,
            idfrontimage: this.home.display_image,
            verified: 0,
            roleid: 2
          }
          this.http.post('https://localhost:44383/api/user', body).subscribe((resps: any) => {
            if (resps != null) {
              const emailBody = {
                Id: resps.id,
                Email: this.email.value
              }
              this.http.post('https://localhost:44383/api/EmailMessage/EmailSender', emailBody).subscribe((resp: any) => {
                this.toastr.success("Verify Your Account Check Your Email")
              }, err => {
                this.toastr.error(err.message, err.status)
              })
              this.toastr.success("register done");
              this.router.navigate(['auth/login']);
              this.toastr.success('You Can Login Now');
              console.log(resps);
            } else {
              this.toastr.warning("you already have an eamil ")
            }
          }, err => {
            this.toastr.error(err.message, err.status)
          });
          this.spinner.hide();
        }
        else {
          console.log(resp);
          this.spinner.hide();
          this.toastr.error("SSN Dose Not Exist");
        }

      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    }
  }
  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0]//the first image 
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    this.home.uploadAttachmentForSsn(formdata);
  }
}
