import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-electionduration',
  templateUrl: './manage-electionduration.component.html',
  styleUrls: ['./manage-electionduration.component.css']
})
export class ManageElectiondurationComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>;
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;

  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }


  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    electionstartdate: new FormControl(),
    electionenddate: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    categoryid: new FormControl(),
  })

  ngOnInit(): void {
    this.home.getAllElectionDuration();
  }

  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      electionstartdate: obj.electionstartdate,
      electionenddate: obj.electionenddate,
      categoryid: obj.categoryid,
    }
    this.updateForm.controls['id'].setValue(+this.p_data.id);
    this.updateForm.controls['categoryid'].setValue(+this.p_data.categoryid);
    this.dialog.open(this.callUpdateDialog);
  }
  saveUpdateData() {
    debugger
    this.UpdateElectionDuration(this.updateForm.value);
    window.location.reload();
  }

  UpdateElectionDuration(body: any) {
    debugger
    console.log(body);
    this.spinner.show();
    this.http.put('https://localhost:44383/api/ElectionDuration', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  Print(ev: any) {
    console.log(ev);
  }
  SendEmailsCandidates() {
    this.home.ElectionDoneForCandidates();
    
  }
  SendEmailsUsers() {
    this.home.ElectionDoneForUsers();
    
  }
}
