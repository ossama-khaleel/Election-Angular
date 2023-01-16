import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>;
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;
  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  createForm: FormGroup = new FormGroup({
    homeimage1: new FormControl('', Validators.required),
    hometitle1: new FormControl('', Validators.required),

  })
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    homeimage1: new FormControl(),
    hometitle1: new FormControl(),
  })
  ngOnInit(): void {
    this.home.getAllHome();
  }
  OpenCreateDialog() {
    this.dialog.open(this.callCreateDialog);
  }
  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      homeimage1: obj.homeimage1,
      hometitle1: obj.hometitle1,
 
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.updateForm.controls['homeimage1'].setValue(this.p_data.homeimage1);
    this.dialog.open(this.callUpdateDialog);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.DeleteHome(id);
          window.location.reload();
        }
        else {
          console.log('thank you');
        }
      }
    })
  }
  saveUpdateData() {
    this.UpdateHome(this.updateForm.value);
    window.location.reload();
  }
  saveData() {
    this.CreateHome(this.createForm.value);
    window.location.reload();
  }

  CreateHome(body: any) {
    body.homeimage1 = this.home.display_image;
    console.log(body);
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    debugger
    this.spinner.show();
    this.http.post('https://localhost:44383/api/Home', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully');
      debugger
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  UpdateHome(body: any) {
    if (this.home.display_image.length != 0) {
      body.homeimage1 = this.home.display_image;
    }
    console.log(body);
    this.spinner.show();
    debugger
    this.http.put('https://localhost:44383/api/Home', body).subscribe((resp: any) => {
      console.log(resp);
      debugger
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  DeleteHome(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44383/api/Home/Delete/' + id).subscribe((resp: any) => {
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
