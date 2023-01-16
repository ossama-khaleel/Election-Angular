import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  constructor(public home: HomeService) { }

  ngOnInit(): void {
    this.home.getAllHomeTestimonial();
  }

}
