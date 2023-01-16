import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/Services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-manage-municipal-status',
  templateUrl: './manage-municipal-status.component.html',
  styleUrls: ['./manage-municipal-status.component.css']
})
export class ManageMunicipalStatusComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>;
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;

  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  createForm: FormGroup = new FormGroup({
    municipalnameid: new FormControl('', Validators.required),
    president: new FormControl('', Validators.required),
    memebers: new FormControl('', Validators.required),
    decentralized: new FormControl('', Validators.required),
    governorateid: new FormControl('', Validators.required)
  })
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    municipalnameid: new FormControl(),
    president: new FormControl(),
    memebers: new FormControl(),
    decentralized: new FormControl(),
    governorateid: new FormControl()
  })
  ngOnInit(): void {
    this.home.getAllGovernorate();
    this.home.getAllMunicipalNames();
    this.home.getAllMunicipalStatus();
  }
  OpenCreateDialog() {
    this.dialog.open(this.callCreateDialog);
  }
  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      municipalnameid: obj.municipalnameid,
      president: obj.president,
      memebers: obj.memebers,
      decentralized: obj.decentralized,
      governorateid: obj.governorateid,
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.dialog.open(this.callUpdateDialog);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.DeleteMunicipalStatus(id);
          window.location.reload();
        }
        else {
          console.log('thank you');
        }
      }
    })
  }
  saveUpdateData() {
    this.UpdateMunicipalStatus(this.updateForm.value);
    window.location.reload();
  }
  saveData() {
    this.CreateMunicipalStatus(this.createForm.value);
    window.location.reload();
  }

  CreateMunicipalStatus(body: any) {
    console.log(body);
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.post('https://localhost:44383/api/MunicipalStatus', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  UpdateMunicipalStatus(body: any) {
    console.log(body);
    this.spinner.show();
    this.http.put('https://localhost:44383/api/MunicipalStatus', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  DeleteMunicipalStatus(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44383/api/MunicipalStatus/Delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  SearchMunicipalName(data: string) {
    if (data == "") {
      this.home.getAllMunicipalStatus();
    }
    else {
      this.spinner.show();
      debugger
      this.http.get('https://localhost:44383/api/municipalStatus/search/' + data).subscribe((resp: any) => {
        this.home.municipalStatus = resp;
        console.log(resp);
        debugger
        this.spinner.hide();
        this.toastr.success('Search Successfully');
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    }
  }

  SreachInput(ev: any) {
    this.SearchMunicipalName(ev.target.value);
  }






}
