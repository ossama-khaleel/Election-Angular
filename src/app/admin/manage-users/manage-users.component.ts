import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>;
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;
  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  createForm: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userimagepath: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.minLength(8)]),
    idfrontimage: new FormControl(),
    idbackimage: new FormControl(),
    userinfoId: new FormControl(),
    phonenumber: new FormControl(),
    roleId: new FormControl(),
  })
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    password: new FormControl(),
    userimagepath: new FormControl(),
    email: new FormControl(),
    idfrontimage: new FormControl(),
    idbackimage: new FormControl(),
    userinfoId: new FormControl(),
    phonenumber: new FormControl(),
    roleId: new FormControl(),
  })
  
  ngOnInit(): void {
    this.home.getAllUser();
    debugger
    
  }
  
  OpenCreateDialog() {
    this.dialog.open(this.callCreateDialog);
  }
  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      firstname: obj.firstname,
      lastname: obj.lastname,
      email: obj.email,
      password: obj.password,
      userimagepath: obj.userimagepath,
      idfrontimage: obj.idfrontimage,
      idbackimage: obj.idbackimage,
      userinfoId: obj.userinfoId,
      phonenumber: obj.phonenumber,
      roleId: obj.roleId,
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.updateForm.controls['userimagepath'].setValue(this.p_data.userimagepath);
    this.dialog.open(this.callUpdateDialog);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.DeleteUser(id);
          window.location.reload();
        }
        else {
          console.log('thank you');
        }
      }
    })
  }
  saveUpdateData() {
    this.UpdateUser(this.updateForm.value);
    window.location.reload();
  }
  saveData() {
    this.CreateUser(this.createForm.value);
    window.location.reload();
  }
  CreateUser(body: any) {
    body.userimagepath = this.home.display_image;
    console.log(body);
    this.spinner.show();
    this.http.post('https://localhost:44383/api/user', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  UpdateUser(body: any) {
    if (this.home.display_image != null) {
      body.userImagePath = this.home.display_image;
    }
    console.log(body);
    this.spinner.show();
    this.http.put('https://localhost:44383/api/user', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  DeleteUser(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44383/api/User/Delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully');
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
