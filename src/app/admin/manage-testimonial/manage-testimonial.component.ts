import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-testimonial',
  templateUrl: './manage-testimonial.component.html',
  styleUrls: ['./manage-testimonial.component.css']
})
export class ManageTestimonialComponent implements OnInit {

  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.home.getAllTestimonial();
  }
  p_data: any = {};
  Reject(obj: any) {
    debugger
    this.p_data = {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      message: obj.message,
      homeid: obj.homeid,
      userid: obj.userid,
      acceptstatus: 1,
    }
    this.UpdateTestimonial(this.p_data);
    window.location.reload();
  }
  Accept(obj: any) {
    debugger
    this.p_data = {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      message: obj.message,
      homeid: obj.homeid,
      userid: obj.userid,
      acceptstatus: 2,
    }
    this.UpdateTestimonial(this.p_data);
    window.location.reload();
  }
  UpdateTestimonial(body: any) {
    console.log(body);
    this.spinner.show();
    this.http.put('https://localhost:44383/api/Testimonial', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
}
