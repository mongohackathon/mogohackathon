import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-timelinetwo',
  templateUrl: './timelinetwo.component.html',
  styleUrls: ['./timelinetwo.component.scss']
})
export class TimelinetwoComponent implements OnInit {

  postedJob:any=[]
  postedJobArray:any=[]
  imgget:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:9000/cts/api/v1/get_job/?job_poster=test").subscribe(data => {
      console.log("data",data);
      this.postedJob = data;  
    });
    

    this.getImg()
  }


  getImg(){
    this.imgget="https://api.lorem.space/image/face?w=150&h=150"
  }

}
