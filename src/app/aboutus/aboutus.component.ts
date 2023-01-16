import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(public home:HomeService) { }

  ngOnInit(): void {
    this.home.GetAbout1();
    this.home.GetAbout2();
    this.home.GetAbout3();
    this.home.GetAbout4();
  }
}
