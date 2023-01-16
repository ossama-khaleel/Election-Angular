import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(public home :HomeService) { }

  ngOnInit(): void {
    this.home.getUserInfo();
    this.home.getAllPlaces();
    this.home.getAllMunicipalNames();
  }
  
}
