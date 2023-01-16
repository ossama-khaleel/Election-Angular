import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  })
 constructor(private router: Router, public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.home.getAllAboutUs();
  }

  saveData() {
    this.CreateContactForm(this.createForm.value);
  }
  CreateContactForm(body: any) {
    this.spinner.show();
    debugger
    this.http.post('https://localhost:44383/api/contactu', body).subscribe((resp: any) => {
      this.spinner.hide();
      this.toastr.success('Your Contact Form Sent successfully', 'Thank You', { positionClass: 'toast-top-center' });
      this.router.navigate(['']);
      debugger
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });

  }
}
