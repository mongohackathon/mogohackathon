import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addjobs',
  templateUrl: './addjobs.component.html',
  styleUrls: ['./addjobs.component.scss']
})
export class AddjobsComponent implements OnInit {

  inquiriesData:any;
  all_companies:any=[]
  company_name:any
  company_id:any
  company_idtwo:any;


  constructor(private http: HttpClient) { }

  addjobform=new FormGroup({
    jcname: new FormControl('',Validators.required),
    jyname: new FormControl('',Validators.required),
    jurl: new FormControl('',Validators.required),
    jid: new FormControl('',Validators.required),
    jtitle: new FormControl('',Validators.required),
    jlocation: new FormControl('',Validators.required),
    jdescription: new FormControl('',Validators.required),
    // jcid: new FormControl('',Validators.required),
  })

  ngOnInit(): void {
    // let url = "http://localhost:8000/cts/api/v1/get_company";
    // this.http.get<any>(url,{}).subscribe((response: any) => {
    //   console.log("get response",response);
    //   this.all_companies = response
    //   console.log("All compabies", this.all_companies)
    //   this.all_companies.companies.forEach( (element:any) => {
    //     this.company_name = element.displayName
    //     if(this.company_name==this.addjobform.jcname){
    //       this.company_id =  element.company_id
    //     }

    //     console.log("Company name is:", element.displayName)
    // });
    // });
  }

  onSubmitJob(){
    console.warn("here we get getFormValues",this.addjobform.value); 
    // const body={
    //   jcnameb:this.addjobform.value.jcname,
    //   jposterb:this.addjobform.value.jyname,
    //   jappurlb:this.addjobform.value.jurl,
    //   jreqidb:this.addjobform.value.jid,
    //   jtitleb:this.addjobform.value.jtitle,
    //   jclocationb:this.addjobform.value.jlocation,
    //   jdescriptionb:this.addjobform.value.jdescription,
    //   // jcidb:this.addjobform.value.jcid,
      
     
    // }

    console.log("company name",this.addjobform.value.jcname);
    
    let url = "http://localhost:9000/cts/api/v1/get_company";
    this.http.get<any>(url,{}).subscribe((response: any) => {
      console.log("get response",response);
      this.all_companies = response
      console.log("All compabies", this.all_companies)
      this.all_companies.companies.forEach( (element:any) => {
        this.company_name = element.displayName
        if(this.company_name==this.addjobform.value.jcname){
          this.company_id =  element.name.split("/", 4)
          console.log("get company id name",this.company_id[3]);
          this.company_idtwo=this.company_id[3]
          console.log("get company_idtwo",this.company_idtwo);

          if(this.company_idtwo){

            const body={
              job_application_url:this.addjobform.value.jurl,
              requisition_id:this.addjobform.value.jid,
              address:this.addjobform.value.jlocation,
              title:this.addjobform.value.jtitle,
              description:this.addjobform.value.jdescription,
              company_id:this.company_idtwo,
              company_name:this.addjobform.value.jcname,
              job_poster:this.addjobform.value.jyname 
        
            }
      
            console.log("postjob display body data",body);
      
            let url = "http://localhost:8000/cts/api/v1/create_jobs/";
            this.http.post<any>(url, body).subscribe((response: any) => {
              console.log("post job function response",response);
            });
      
      
          }else{
            alert("Compnay id not found")
            
          }

          
        }else{
          console.log("else run");
          
        }

        console.log("Company name is:", element.displayName)
    });
    });

    // this.postjob()















    // const body={
    //   display_name:this.addjobform.value.jcname,
    //   external_id:this.addjobform.value.jcname + "_LLC",
    // }

    // console.log("display body data",body);
    
    // let url = this.globalservice.base_path_api() + 'inquiries/addInquiries';
    // let url = "http://localhost:8000/cts/api/v1/"+"create_company/";
    // this.http.post<any>(url, body).subscribe((response: any) => {
    //   console.log("get response",response);
    // });

    // let url = "http://localhost:8000/cts/api/v1/get_company";
    // this.http.get<any>(url,{}).subscribe((response: any) => {
    //   console.log("get response",response);
    // });


    // setTimeout(() => {
    //   console.log("set time out call ");
    //   this.addjobform.reset()
      
    // },3000);

    // this.postjob()
    
  }





  postjob(){
    console.log("jop posted");

    // if(this.company_idtwo){

    //   const body={
    //     job_application_url:this.addjobform.value.jurl,
    //     requisition_id:this.addjobform.value.jid,
    //     address:this.addjobform.value.jlocation,
    //     title:this.addjobform.value.jtitle,
    //     description:this.addjobform.value.jdescription,
    //     company_id:this.company_idtwo,
    //     company_name:this.addjobform.value.jcname,
    //     job_poster:this.addjobform.value.jyname 
  
    //   }

    //   console.log("postjob display body data",body);

    //   let url = "http://localhost:8000/cts/api/v1/"+"create_jobs/";
    //   this.http.post<any>(url, body).subscribe((response: any) => {
    //     console.log("post job function response",response);
    //   });


    // }else{
    //   alert("Compnay id not found")
      
    // }

    const body={
      job_application_url:this.addjobform.value.jurl,
      requisition_id:this.addjobform.value.jid,
      address:this.addjobform.value.jlocation,
      title:this.addjobform.value.jtitle,
      description:this.addjobform.value.jdescription,
      // company_id:this.addjobform.value.jcname,
      company_name:this.addjobform.value.jcname,
      job_poster:this.addjobform.value.jyname 

    }

    console.log("display body data",body);
    
    // let url = this.globalservice.base_path_api() + 'inquiries/addInquiries';
    let url = "http://localhost:9000/cts/api/v1/"+"create_jobs/";
    this.http.post<any>(url, body).subscribe((response: any) => {
      console.log("post job response",response);
    });
    
  }












}
