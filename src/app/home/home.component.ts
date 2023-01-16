import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  ngOnInit(): void {
    this.home.getAllHome();
    this.home.getAllTestimonial();
    this.home.getAllHomeTestimonial();
    this.home.getAllAboutUs();
  }
  constructor(public home: HomeService, private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    
  }
  
}