import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from '@rxweb/reactive-form-validators';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hsn',
  templateUrl: './hsn.component.html',
  styleUrls: ['./hsn.component.css']
})
export class HsnComponent implements OnInit {

  constructor(private allapi:AllapiService) { }
 
  hform= new UntypedFormGroup(
    {
      add_cat:new UntypedFormControl('',[Validators.required]),
      factorid:new UntypedFormControl(''),
      hsncode:new UntypedFormControl('',[Validators.required]),
      min_max_condiction:new UntypedFormControl(''),
      mincondiction:new UntypedFormControl(''),
      maxcondiction:new UntypedFormControl(''),
      gst:new UntypedFormControl(''),
    });

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  search="";
  showadd=false;

  screen:any=0
  screenBody:any=0
  submitted=false;
  hsn_id=0;
  factor_id="";
  hsn_code="";
  min_condiction="";
  max_condiction="";
  gst_percentage="";
  additional_cat_id="";
  is_min_max_condiction:boolean=false;
  factor_list:any;
  hsn_list:any;
  add_cat_list:any;


  ngOnInit(): void {
   
    let url='Hsn/get_data/'
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.factor_list=JSON.parse(promise.factor_list).Table;
        this.hsn_list=JSON.parse(promise.hsn_list).Table;
        this.add_cat_list=JSON.parse(promise.add_cat_list).Table;
 
      })
  }

  change_condiction(ss:any)
  {
if(ss==true)
{

  this.hform.controls["mincondiction"].setValidators([Validators.required])
  this.hform.controls["mincondiction"].updateValueAndValidity();
  this.hform.controls["maxcondiction"].setValidators([Validators.required])
  this.hform.controls["maxcondiction"].updateValueAndValidity();
}
else{

  this.hform.controls["mincondiction"].setValidators(null)
  this.hform.controls["mincondiction"].updateValueAndValidity();
  this.hform.controls["maxcondiction"].setValidators(null)
  this.hform.controls["maxcondiction"].updateValueAndValidity();
}
  }
 
  save_data()
  {
    this.submitted=true;
    if(this.hform.invalid)
    {
      return
    }
    if(this.min_condiction==""||this.min_condiction==null)
    {
      this.min_condiction="0";
    }
    if(this.max_condiction==""||this.max_condiction==null)
    {
      this.max_condiction="0";
    }
    if(this.factor_id==""|| this.factor_id==null)
    {
      this.factor_id="0";
    }
    if(this.is_min_max_condiction==null)
    {
      this.is_min_max_condiction=false;
    }
var data={
  "hsn_id":this.hsn_id,
"additional_category_id":parseInt(this.additional_cat_id),
"factor_id":parseInt(this.factor_id),
"hsn_code":parseInt(this.hsn_code),
"is_min_max_condiction":this.is_min_max_condiction,
"min_condiction":parseInt(this.min_condiction),
"max_condiction":parseInt(this.max_condiction),
"gst_percentage":parseInt(this.gst_percentage),
"language_id":1
}
let url='Hsn/save_data/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    if(promise.status=="Insert")
    {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
    this.factor_list=JSON.parse(promise.factor_list).Table;
        this.hsn_list=JSON.parse(promise.hsn_list).Table;
        this.add_cat_list=JSON.parse(promise.add_cat_list).Table;
    this.showadd=false;
    this.hsn_id=0;
    this.submitted=false;
    this.hform.reset();
    }
    else if(promise.status=="Failed")
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })

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
    this.hsn_id=ss.hsn_id;
this.additional_cat_id=ss.additional_category_id;
this.factor_id=ss.factor_id;
this.hsn_code=ss.hsn_code;
this.is_min_max_condiction=ss.is_min_max_condiction;
this.min_condiction=ss.min_condiction;
this.max_condiction=ss.max_condiction;
this.gst_percentage=ss.gst_percentage;
    this.showadd=true;
  }
  show_add()
  {
    this.showadd=true;
    this.hsn_id=0;
    this.submitted=false;
    this.hform.reset();
  }
    showlist()
    {
      this.showadd=false;
      this.hsn_id=0;
      this.submitted=false;
      this.hform.reset();
    }
    clear()
    {
      this.hsn_id=0;
      this.submitted=false;
      this.hform.reset();
    }
   
    stringify(e:any){
      return JSON.stringify(e)
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
