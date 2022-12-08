import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchtwo',
  templateUrl: './searchtwo.component.html',
  styleUrls: ['./searchtwo.component.scss']
})

export class SearchtwoComponent implements OnInit {
  value:any;

  dataSource:any=[]

  searchDataArray:any=[]

  searchDataArrayTwo:any=[]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/todos").subscribe(data => {
      console.log("data",data);
      this.dataSource = data;
      console.log("this datasource",this.dataSource);
      
    });
  }


  Searchenterdata(e:any) {
    console.log("Search data", e);
    // let url = this.globalservice.base_path_api() + 'cars/search-car/' + e;
    // this.globalservice.PostRequest(url, {}).subscribe(res => {
    //   this.Searchdata = res.data
    //   console.log("Search data array", this.Searchdata);
    // })
  }

  getSearch(){
    console.log("get search value",this.value);
    const url="http://localhost:9000/cts/api/v1/search_jobs/?keyword="+this.value
    console.log("get url of serach",url);
    
    this.http.get(url,{}).subscribe(data => {
      console.log("data",data);
      this.searchDataArray = data;
      console.log("this searchDataArray",this.searchDataArray);
      this.searchDataArrayTwo=this.searchDataArray.matchingJobs
      console.log("get searchDataArrayTwo",this.searchDataArrayTwo);
      
    });
    
    
  }

}
