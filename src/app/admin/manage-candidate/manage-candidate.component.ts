import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';
@Component({
  selector: 'app-manage-candidate',
  templateUrl: './manage-candidate.component.html',
  styleUrls: ['./manage-candidate.component.css']
})
export class ManageCandidateComponent implements OnInit {

  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.home.getAllCandidate();
  }
  
  p_data: any = {};
  Reject(obj: any) {
    debugger
    this.p_data = {
      id: obj.id,
      candidatename: obj.candidatename,
      categoryid: obj.categoryid,
      userid: obj.userid,
      acceptstatus: 1,
    }
    this.UpdateCandidateForm(this.p_data);
    window.location.reload();
  }
  Accept(obj: any) {
    debugger
    this.p_data = {
      id: obj.id,
      candidatename: obj.candidatename,
      categoryid: obj.categoryid,
      userid: obj.userid,
      acceptstatus: 2,
    }
    this.UpdateCandidateForm(this.p_data);
    window.location.reload();
  }
  UpdateCandidateForm(body: any) {
    console.log(body);
    this.spinner.show();
    this.http.put('https://localhost:44383/api/CandidateForm', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  
}
