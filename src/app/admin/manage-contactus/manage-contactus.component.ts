import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-contactus',
  templateUrl: './manage-contactus.component.html',
  styleUrls: ['./manage-contactus.component.css']
})
export class ManageContactusComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>;
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;
  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    homeid: new FormControl('', Validators.required),
  })
  updateForm: FormGroup = new FormGroup({
    id:new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    subject: new FormControl(),
    message: new FormControl(),
    homeid: new FormControl(),
  })
  ngOnInit(): void {
    this.home.getAllContactUs();
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
      subject: obj.subject,
      message: obj.message,
      homeid:obj.homeid
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.dialog.open(this.callUpdateDialog);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.DeleteContactUs(id);
          window.location.reload();
        }
        else {
          console.log('thank you');
        }
      }
    })
  }
  saveUpdateData() {
    this.UpdateContactUs(this.updateForm.value);
    // window.location.reload();
  }
  saveData() {
    this.CreateContactUs(this.createForm.value);
    // window.location.reload();
  }

  CreateContactUs(body: any) {
    console.log(body);
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.post('https://localhost:44383/api/Contactu', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  UpdateContactUs(body: any) {
    console.log(body);
    this.spinner.show();
    this.http.put('https://localhost:44383/api/Contactu', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  DeleteContactUs(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44383/api/Contactu/Delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
}
