import { Component } from '@angular/core';
import { HomeService } from './Services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Election';

  constructor(private home: HomeService) { }
  ngOnInit(): void {
    this.home.getAllVillages();
    this.home.getAllPlaceOfResidence();
    this.home.getAllMunicipalStatus();
    this.home.getAllMunicipalName();
    this.home.getAllCategory();
    this.home.getAllHome();
  }
}
