import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-municipal-name',
  templateUrl: './manage-municipal-name.component.html',
  styleUrls: ['./manage-municipal-name.component.css']
})
export class ManageMunicipalNameComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>;
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;
  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  createForm: FormGroup = new FormGroup({
    municipalname: new FormControl('', Validators.required),
  })
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    municipalname: new FormControl(),
  })
  ngOnInit(): void {
    this.home.getAllMunicipalNames();
  }
  OpenCreateDialog() {
    this.dialog.open(this.callCreateDialog);
  }
  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      municipalname: obj.municipalname,
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.dialog.open(this.callUpdateDialog);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.DeleteMunicipalName(id);
          window.location.reload();
        }
        else {
          console.log('thank you');
        }

      }
    })

  }
  saveUpdateData() {
    this.UpdateMunicipalName(this.updateForm.value);
    window.location.reload();
  }

  saveData() {
    this.CreateMunicipalName(this.createForm.value);
    window.location.reload();
  }

  CreateMunicipalName(body: any) {
    this.spinner.show();
    this.http.post('https://localhost:44383/api/MunicipalName', body).subscribe((resp: any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });

  }
  UpdateMunicipalName(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44383/api/MunicipalName', body).subscribe((resp: any) => {
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  DeleteMunicipalName(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44383/api/MunicipalName/Delete/' + id).subscribe((resp: any) => {
      this.spinner.hide();
      this.toastr.success('Deleted Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  SearchMunicipalName(data: string) {
    if (data == "") {
      this.home.getAllMunicipalName();
    }
    else {
      this.spinner.show();
      this.http.get('https://localhost:44383/api/municipalName/search/' + data).subscribe((resp: any) => {
        this.home.municipalName = resp;
        this.spinner.hide();
        this.toastr.success('Search Successfully');
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    }
  }
  SreachInput(ev: any) {
    console.log(ev.target.value);
    this.SearchMunicipalName(ev.target.value);
  }
}




