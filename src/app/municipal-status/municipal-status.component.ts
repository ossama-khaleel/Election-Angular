import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-municipal-status',
  templateUrl: './municipal-status.component.html',
  styleUrls: ['./municipal-status.component.css']
})
export class MunicipalStatusComponent implements OnInit {

  constructor(public home :HomeService) { }

  ngOnInit(): void {
    this.home.getAllMunicipalNames();
  }

}
