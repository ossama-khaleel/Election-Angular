import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-places',
  templateUrl: './manage-places.component.html',
  styleUrls: ['./manage-places.component.css']
})
export class ManagePlacesComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>;
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>;
  constructor(public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  createForm: FormGroup = new FormGroup({
    placeofresidenceid: new FormControl(),
    placeofresidencevillageid: new FormControl(),
    municipalstatusid: new FormControl(),
  })

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    placeofresidenceid: new FormControl(),
    placeofresidencevillageid: new FormControl(),
    municipalstatusid: new FormControl(),
  })
  ngOnInit(): void {
    this.home.getAllPlaces();
    this.home.getAllMunicipalNames();
  }

  OpenCreateDialog() {
    this.dialog.open(this.callCreateDialog);
  }
  
  p_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.p_data = {
      id: obj.id,
      placeofresidenceid: obj.placeofresidenceid,
      placeofresidencevillageid: obj.placeofresidencevillageid,
      municipalstatusid: obj.municipalstatusid,
    }
    this.updateForm.controls['id'].setValue(this.p_data.id);
    this.dialog.open(this.callUpdateDialog);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.DeletePlace(id);
          window.location.reload();
        }
        else {
          console.log('thank you');
        }
      }
    })

  }

  saveUpdateData() {
    this.UpdatePlace(this.updateForm.value);
    window.location.reload();
  }

  saveData() {
    this.CreatePlace(this.createForm.value);
    window.location.reload();
  }

  CreatePlace(body: any) {
    debugger
    this.spinner.show();
    this.http.post('https://localhost:44383/api/PlacesWithintheMunicipal', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });

  }
  UpdatePlace(body: any) {
    debugger
    this.spinner.show();
    this.http.put('https://localhost:44383/api/PlacesWithintheMunicipal', body).subscribe((resp: any) => {
      this.spinner.hide();
      this.toastr.success('Updated Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  DeletePlace(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44383/api/PlacesWithintheMunicipal/Delete/' + id).subscribe((resp: any) => {
      this.spinner.hide();
      this.toastr.success('Deleted Successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

}
