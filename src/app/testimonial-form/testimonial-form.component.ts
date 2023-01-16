import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.css']
})
export class TestimonialFormComponent implements OnInit {

  constructor(private router: Router, public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService, private snackbar: MatSnackBar) 
  {
    this.ratingArr = Array(this.starCount).fill(false);
  }
  // name = new FormControl('',Validators.required);
  // email = new FormControl('', [Validators.required, Validators.email]);
  // message = new FormControl('',Validators.required);
  rating = 0;
  starCount = 5;
  ratingArr: boolean[] = [];
  getstar: any = {};
  snackBarDuration = 1000;
  response = [
    'You brok my heart!',
    'Really?',
    'We will do better next time.',
    'Glad you like it!',
    'Thank you so much!'
  ]
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
    userid: new FormControl(),
    acceptstatus: new FormControl(),
  })

  ngOnInit(): void {
    this.GetStarReview();
  }
  saveData() {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.createForm.controls['userid'].setValue(+user.UserId);
      this.createForm.controls['acceptstatus'].setValue(0);
      debugger
      this.CreateTestimonial(this.createForm.value);
    } else {
      this.toastr.error('Please Login First', '', { positionClass: 'toast-bottom-center' });
    }
    // window.location.reload();
  }

  CreateTestimonial(body: any) {
    this.spinner.show();
    this.http.post('https://localhost:44383/api/Testimonial', body).subscribe((resp: any) => {
      this.spinner.hide();
      this.toastr.success('Your Submition was Taken', 'Thank you', { positionClass: 'toast-top-center' });
      this.router.navigate(['']);
      debugger
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  returnStar(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  onClick(i: number) {
    this.rating = i + 1;
    this.snackbar.open(this.response[i], '', {
      duration: this.snackBarDuration,
      panelClass: ['snack-bar']
    });
    this.CreateReview(this.rating);
  }
  CreateReview(i: number) {
    let user: any = localStorage.getItem('user');
    if (user) {
      if (this.getstar == null) {
        user = JSON.parse(user);
        const star = {
          opinion: i,
          userid: +user.UserId
        }
        console.log(i);
        this.spinner.show();
        debugger
        this.http.post('https://localhost:44383/api/review', star).subscribe((resp: any) => {
          console.log(resp);
          debugger
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          this.toastr.error(err.message, err.status);
        });
      } else if (this.getstar != null) {
        this.getstar.opinion = +i;
        this.spinner.show();
        debugger
        this.http.put('https://localhost:44383/api/review', this.getstar).subscribe((resp: any) => {
          console.log(resp);
          debugger
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          this.toastr.error(err.message, err.status);
        });
      }
    }
  }
  GetStarReview() {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      let ID: number = +user.UserId
      this.spinner.show();
      debugger
      this.http.get('https://localhost:44383/api/review/Getstar/' + ID).subscribe((resp: any) => {
        console.log(resp);
        this.getstar = resp;
        debugger
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    }
  }
}
