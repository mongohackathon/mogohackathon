import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobnotification',
  templateUrl: './jobnotification.component.html',
  styleUrls: ['./jobnotification.component.scss']
})
export class JobnotificationComponent implements OnInit {

  inquiriesData:any;
 
 constructor(private http: HttpClient) { }
 
 notificationform=new FormGroup({
   nemail: new FormControl('',Validators.email),
   nstatus: new FormControl('',Validators.required),
   njobtitle: new FormControl('',Validators.required),
   ncompany: new FormControl('',Validators.required),
   nlocation: new FormControl('',Validators.required),
 })
 
 ngOnInit(): void {
 }
 
 onSubmitJob(){
   console.warn("here we get notificationform form value",this.notificationform.value);
   const body={
     //mongo_fields:form_fields
     jcnameb:this.notificationform.value.nemail,
     jposterb:this.notificationform.value.nstatus,
     jappurlb:this.notificationform.value.njobtitle,
     jreqidb:this.notificationform.value.ncompany,
     jtitleb:this.notificationform.value.nlocation,
   }
 
 
   setTimeout(() => {
     console.log("set time out call ");
     this.notificationform.reset()
    
   },3000);
 
 }


}
