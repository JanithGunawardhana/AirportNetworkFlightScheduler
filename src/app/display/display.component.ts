import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FlightComponent } from './flight/flight.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { DataSource } from '@angular/cdk/table';

export interface FlightData {
  flight_id: string;
  flight_name: string;
  destination: string;
  current_location: string;
  country_name: string;
  city_name?: string;
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  flightCollection: AngularFirestoreCollection<FlightData>;
  flights:Observable<FlightData[]>;
  isAdmin = false;
  dataSource = new FlightDataSourse(this);
  displayedColumns: string[]; 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  flight_id = '';
  flight_name = '';
  destination = '';
  current_location = '';
  country_name = '';
  city_name = '';
  constructor(private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private firestore: AngularFirestore) {
  this.flightCollection = firestore.collection('flights');
  this.flights = this.flightCollection.valueChanges();
  console.log(this.flightCollection);
  

  console.log(localStorage.getItem('loginStatus') == 'true'); 

  if ( localStorage.getItem('loginStatus') == 'true' ) {
    this.isAdmin = true;
    this.displayedColumns = ['flight_id', 'flight_name', 'destination', 'current_location', 'country_name', 'edit', 'delete'];
  } else {
    this.displayedColumns = ['flight_id', 'flight_name', 'destination', 'current_location', 'country_name'];
  }
  // this.dataSource = new MatTableDataSource(flights);
}

getFlightDetails() {
    
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
    return this.router.navigate(['']);
    location.reload();
  }

  onAddNewFlight() {
    console.log("add new");
    this.openDialog('new');
  }

  onEdit(row) {
    console.log(row);
    this.flight_id = row.flight_id;
    this.flight_name = row.flight_name;
    this.destination = row.destination;
    this.current_location = row.current_location;
    this.country_name = row.current_location;
    this.city_name = row.city_name;
    this.openDialog('edit');
  }

  onDelete(row){
    console.log('delete fuction');
    this.firestore.collection('flights').doc(row.flight_id).delete();
  }

  openDialog(modification): void {
    const dialogRef = this.dialog.open(FlightComponent, {
      width: '450px',
      data: {id:this.flight_id, name:this.flight_name, destination: this.destination,
            location: this.current_location, country:this.country_name, city: this.city_name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== undefined) {
        const data = {};
        data['country_name'] = result.country;
        data['flight_id'] = result.id;
        data['flight_name'] = result.name;
        data['destination'] = result.destination;
        data['current_location'] = result.location;
        if (result.city !== undefined){
          if (result.city.trim() !== '') {
            data['city_name'] = result.city;
          }
        }
        console.log(data);
        if (modification === 'new') {
          this.firestore.collection('flights').doc(result.id).set(data);
        } else {
          this.firestore.collection('flights').doc(result.id).update(data);
        }
      }
    });
    this.flight_id = '';
    this.flight_name = '';
    this.destination = '';
    this.current_location = '';
    this.country_name = '';
    this.city_name = '';
  }

  applyFilter(filterValue: string) {

    filterValue.trim().toLowerCase();

    /*if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }
}

export class FlightDataSourse extends DataSource<any> {
  constructor(private display: DisplayComponent){
    super();
  }
  connect():Observable<FlightData[]>{
    return this.display.flights;
  }
  disconnect(){}
}