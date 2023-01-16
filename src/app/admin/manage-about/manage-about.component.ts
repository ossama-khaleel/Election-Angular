import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-about',
  templateUrl: './manage-about.component.html',
  styleUrls: ['./manage-about.component.css']
})
export class ManageAboutComponent implements OnInit {
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;
  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.home.GetAboutAll();
  }
  updateForm: FormGroup = new FormGroup({
    id:new FormControl(),
    aboutimage1: new FormControl(),
    abouttitle1: new FormControl(),
  })



  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      aboutimage1: obj.aboutimage1,
      abouttitle1: obj.abouttitle1,
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.updateForm.controls['aboutimage1'].setValue(this.p_data.aboutimage1);
    this.dialog.open(this.callUpdateDialog);
  }

  saveUpdateData() {
    this.UpdateAboutUs(this.updateForm.value);
    debugger
    window.location.reload();
  }

  UpdateAboutUs(body: any) {
    if (this.home.display_image.length != 0) {
      debugger
      body.aboutimage1 = this.home.display_image;
    }
    console.log(body);
    this.spinner.show();
    this.http.put('https://localhost:44383/api/About', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0]//the first image 
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    this.home.uploadAttachment(formdata);
  }
}
