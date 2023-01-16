import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }
  password = new FormControl('', [Validators.required, Validators.minLength(10)]);
  ssn = new FormControl('', [Validators.minLength(10), Validators.required]);
  ngOnInit(): void {
  }
  Submit() {
    console.log(this.password.value, this.ssn.value);
    this.auth.Login(this.password.value, this.ssn.value);
  }
}
