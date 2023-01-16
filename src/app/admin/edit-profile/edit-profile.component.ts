import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;
  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    password: new FormControl(),
    phonenumber: new FormControl(),
    email: new FormControl(),
    userimagepath: new FormControl(),
  })
  ngOnInit(): void {
    this.home.getUserById();
  }

  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      firstname: obj.firstname,
      lastname: obj.lastname,
      password: obj.password,
      phonenumber: obj.phonenumber,
      email: obj.email,
      userimagepath: obj.userimagepath,
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.updateForm.controls['userimagepath'].setValue(this.p_data.userimagepath);
    this.dialog.open(this.callUpdateDialog);
  }
  saveUpdateData() {
    this.UpdateUser(this.updateForm.value);
    window.location.reload();
    
  }
  UpdateUser(body: any) {
    if (this.home.display_image.length != 0) {
      debugger
      body.userimagepath = this.home.display_image;
    }
    console.log(body);
    this.spinner.show();
    debugger
    this.http.put('https://localhost:44383/api/user', body).subscribe((resp: any) => {
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
