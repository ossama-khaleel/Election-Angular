import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(public home: HomeService, private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }
  test: any[] = []
  ngOnInit(): void {
    this.GetChart();
  }
  GetChart() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/uservoted/chart').subscribe((resp: any) => {
      this.test = resp;
      this.spinner.hide();
      debugger
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
}

