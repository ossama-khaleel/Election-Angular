import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})
export class GovernorateComponent implements OnInit {

  constructor(public home: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.home.getAllGovernorate();

  }
  GetMuni(id: number) {
    this.home.GetMuniByCategory(id);
    this.router.navigate(['/status']);
  }

}
