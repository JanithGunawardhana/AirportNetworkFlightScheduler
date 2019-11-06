import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FlightComponent } from './flight/flight.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  isAdmin = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,) {

  console.log(localStorage.getItem('loginStatus') == 'true');
  if ( localStorage.getItem('loginStatus') == 'true' ) {
    this.isAdmin = true;
  }
}

  ngOnInit() {
  }

  onLoginAsAdmin() {
    console.log("login function");
    return this.router.navigate(['/login/']);
  }

  onSignOut() {
    console.log("sign out function");
    this.isAdmin = false;
    localStorage.removeItem('loginStatus');
  }

  onAddNewFlight() {
    console.log("add new");
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FlightComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
