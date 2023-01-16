import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.home.getAllCategory();
  }
  name: string = 'Search For Type Of Election'
  showProfile(id: number) {
    this.home.GetCandidatesByCondition(id);
    this.home.getAllElectionDuration();
  }
  SearchMunicipalName(data: string) {
    if (data == "") {
      this.home.getAllCategory();
    }
    else {
      this.spinner.show();
      this.http.get('https://localhost:44383/api/category/search/' + data).subscribe((resp: any) => {
        this.home.category = resp;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    }
  }
  SreachInput(ev: any) {
    debugger
    this.name = ev.target.value;
    debugger
    this.SearchMunicipalName(this.name);
  }
}
