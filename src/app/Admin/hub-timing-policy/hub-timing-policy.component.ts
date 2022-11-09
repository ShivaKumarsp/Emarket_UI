import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from '@rxweb/reactive-form-validators';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hub-timing-policy',
  templateUrl: './hub-timing-policy.component.html',
  styleUrls: ['./hub-timing-policy.component.css']
})
export class HubTimingPolicyComponent implements OnInit {

  constructor(private allapi:AllapiService) { }
 
  hform= new UntypedFormGroup(
    {
      roleid:new UntypedFormControl('',[Validators.required]),    
      hubid:new UntypedFormControl('',),   
      fcid:new UntypedFormControl('',),   
      veid:new UntypedFormControl('',),    
      deid:new UntypedFormControl('',),    
      start_time:new UntypedFormControl('',[Validators.required]),     
      end_time:new UntypedFormControl('',[Validators.required]),
      vendorprocess_time:new UntypedFormControl('')   
     
    });

    page: number = 1;
    count: number = 0;
    tableSize: number = 7;
    tableSizes: any = [3, 6, 9, 12];
  search="";

  screen:any=0
  screenBody:any=0
  submitted=false;
  showadd=false;

  work_policy_id=0;
  start_time="";
  end_time="";
  fc_start_time="";
  fc_end_time="";
  vendor_process_time="";

hub_timing_list:any;
hub_list:any;

role_list:any;
fc_list:any;
vendor_list:any;
de_list:any;
role_id="";
hub_id="";
facilitation_id="";
vendor_id="";
delivery_executive_id="";
hub_fc_ve_de_id="";
controlEnabled:boolean = true;
  ngOnInit(): void {
    this.controlEnabled = false;
    let url='Hub_Timing_Policy/get_data/'
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {      
        this.role_list= JSON.parse(promise.role_list).Table;
        this.hub_list=JSON.parse(promise.hub_list).Table;
        this.fc_list=JSON.parse(promise.fc_list).Table;
        this.vendor_list=JSON.parse(promise.vendor_list).Table;
        this.de_list=JSON.parse(promise.de_list).Table;

        this.hub_timing_list=JSON.parse(promise.hub_timing_list).Table;
      
      })
  }

 
  save_data()
  {
    this.submitted=true;
    if(this.hform.invalid)
    {
      return
    }
    if(this.vendor_process_time=="")
    {
      this.vendor_process_time="0";
    }

var data={
  "work_policy_id":this.work_policy_id,
  "role_id":parseInt(this.role_id),
  "hub_fc_ve_de_id":parseInt(this.hub_fc_ve_de_id),
  "start_time":this.start_time,
  "end_time":this.end_time,
  "vendor_process_time":parseInt(this.vendor_process_time),
  "language_id":1
}
let url='Hub_Timing_Policy/save_hub_time/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    if(promise.status=="Success")
    {
      this.controlEnabled=false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
    this.role_list= JSON.parse(promise.role_list).Table;
    this.hub_list=JSON.parse(promise.hub_list).Table;
    this.fc_list=JSON.parse(promise.fc_list).Table;
    this.vendor_list=JSON.parse(promise.vendor_list).Table;
    this.de_list=JSON.parse(promise.de_list).Table;
    this.hub_timing_list=JSON.parse(promise.hub_timing_list).Table;

    this.work_policy_id=0;
    this.showadd=false;
    this.submitted=false;
    this.hform.reset();
    }
  
    else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
    }
  })
  }
  edit_data(ss:any)
  {
    var data={
      "language_id":1
    }

    let url='Hub_Timing_Policy/edit_hub_time/';
this.allapi.PostData(url,data).subscribe(promise=>
  {

    this.hub_list=JSON.parse(promise.hub_list).Table;
    this.fc_list=JSON.parse(promise.fc_list).Table;
    this.vendor_list=JSON.parse(promise.vendor_list).Table;
    this.de_list=JSON.parse(promise.de_list).Table;
   
    this.work_policy_id=ss.work_policy_id;
    this.role_id=ss.role_id;
    this.hub_fc_ve_de_id=ss.hub_fc_ve_de_id;
  this.start_time=ss.start_time;
  this.end_time=ss.end_time;
    this.vendor_process_time=ss.vendor_process_time;   
    this.controlEnabled=true;
    this.showadd=true;
  })
  }
  show_add()
  {
    this.controlEnabled=false;
    this.showadd=true;
    this.work_policy_id=0;
    this.submitted=false;
    this.hform.reset();
  }
    showlist()
    {
      this.showadd=false;
      this.work_policy_id=0;
      this.submitted=false;
      this.hform.reset();
    }
    clear()
    {
      this.controlEnabled=false;
      this.work_policy_id=0;
      this.submitted=false;
      this.hform.reset();
    }
 
    //validation
    get f(){
      return this.hform.controls;
    }


    keyPressSpace(event:any) {
      if(event.target.selectionStart===0 && event.code==='Space')
      {
        event.preventDefault();       
      }
    }
    keyPressSpace1(event:any) {
      if(event.code==='Space')
      {
        event.preventDefault();       
      }
    }

  onTableDataChange(event: any) {
      this.page = event;
     
    }
}
