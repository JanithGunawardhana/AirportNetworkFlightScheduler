import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  correctUsername = 'admin';
  correctPassword = 'password';
  username = '';
  password = '';
  constructor(private router : Router) { }

  ngOnInit() {
  }

  onLogin() {
    console.log("login button");
    if ( this.username.trim() === '' ) {
      alert("Enter Username");
    } else if ( this.password.trim() === '' ){
      alert("Enter password");
    }else if (this.username.trim() === this.correctUsername && this.password === this.correctPassword) {
      console.log("login success");
      localStorage.setItem('loginStatus','true');
      return this.router.navigate(['']);
    } else {
      alert("Enter correct Username and Password")
    } 
  }

}
