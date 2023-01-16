import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-all-candidate',
  templateUrl: './all-candidate.component.html',
  styleUrls: ['./all-candidate.component.css']
})
export class AllCandidateComponent implements OnInit {

  constructor(public home: HomeService) { }

  ngOnInit(): void {
    this.home.getAllCandidates();
  }

}
