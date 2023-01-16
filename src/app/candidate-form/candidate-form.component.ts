import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit {
  createForm: FormGroup = new FormGroup({
    candidatename: new FormControl('', Validators.required),
    categoryid: new FormControl('', Validators.required),
    acceptstatus: new FormControl('', Validators.required),
    userid: new FormControl('', Validators.required),
  })
  constructor(private router: Router, public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.home.getAllAboutUs();
  }
  saveData() {
    debugger
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    this.createForm.controls['userid'].setValue(+user.UserId);
    this.createForm.controls['acceptstatus'].setValue(0);
    this.CreateCandidateForm(this.createForm.value);

  }
  CreateCandidateForm(body: any) {
    this.spinner.show();
    debugger
    this.http.post('https://localhost:44383/api/candidateform', body).subscribe((resp: any) => {
      if (resp != null) {
        this.spinner.hide();
        this.toastr.success('Your Request Sent successfully', '', { positionClass: 'toast-top-center' });
        this.router.navigate(['']);
      } else {
        this.spinner.hide();
        this.toastr.error('You Aleardy Have A Previous Requset', '', { positionClass: 'toast-top-center' });
        this.router.navigate(['']);
      }
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });

  }
}
