import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-aboutus',
  templateUrl: './manage-aboutus.component.html',
  styleUrls: ['./manage-aboutus.component.css']
})
export class ManageAboutusComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>;
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;
  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    phonenumber: new FormControl('', [Validators.required,Validators.maxLength(10)]),
  })
  updateForm: FormGroup = new FormGroup({
    id:new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    phonenumber: new FormControl(),
  })
  ngOnInit(): void {
    this.home.getAllAboutUs();
  }

  OpenCreateDialog() {
    this.dialog.open(this.callCreateDialog);
  }
  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      phonenumber: obj.phonenumber,
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.dialog.open(this.callUpdateDialog);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.DeleteAboutUs(id);
          window.location.reload();
        }
        else {
          console.log('thank you');
        }
      }
    })
  }
  saveUpdateData() {
    this.UpdateAboutUs(this.updateForm.value);
    window.location.reload();
  }
  saveData() {
    this.CreateAboutUs(this.createForm.value);
    window.location.reload();
  }

  CreateAboutUs(body: any) {
    console.log(body);
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.post('https://localhost:44383/api/Aboutu', body).subscribe((resp: any) => {
      console.log(resp);
      debugger
      this.spinner.hide();
      this.toastr.success('Created Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  UpdateAboutUs(body: any) {
    console.log(body);
    debugger
    this.spinner.show();
    this.http.put('https://localhost:44383/api/Aboutu', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      debugger
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  DeleteAboutUs(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44383/api/Aboutu/Delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
}
