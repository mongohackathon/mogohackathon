import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


export interface Data {
  // userId: string;
  // Id: number;
  // title: number;
  // completed: boolean;

  jname:string;
  jtitle:string;
  jcompany:string;
  jurl:string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  //'id', 'userId', 'title', 'completed',
  displayedColumns: string[] = ['jname','jtitle','jcompany','jurl'];

  dataSource:any = new MatTableDataSource(ELEMENT_DATA);

  

  constructor(private http: HttpClient) {
    this.http.get("http://localhost:9000/cts/api/v1/get_job?job_poster=test").subscribe(data => {
      console.log("data",data);
      this.dataSource.data = data;
      console.log("this datasource",this.dataSource);
      
    });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
