import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  value:any;

  dataSource:any=[]
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/todos").subscribe(data => {
      console.log("data",data);
      this.dataSource = data;
      console.log("this datasource",this.dataSource);
      
    });
  }

  getSearch(){
    console.log("get search value",this.value);
    
  }

  Searchenterdata(e:any) {
    console.log("Search data", e);
    // let url = this.globalservice.base_path_api() + 'cars/search-car/' + e;
    // this.globalservice.PostRequest(url, {}).subscribe(res => {
    //   this.Searchdata = res.data
    //   console.log("Search data array", this.Searchdata);
    // })
  }



}
