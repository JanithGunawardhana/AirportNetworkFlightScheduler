import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Airport-Network-Flight-Scheduler';
  constructor(private router: Router,){

  }

  onHome() {
    return this.router.navigate(['']);
  }

  onLogin() {
    return this.router.navigate(['/login/']);
  }
}
