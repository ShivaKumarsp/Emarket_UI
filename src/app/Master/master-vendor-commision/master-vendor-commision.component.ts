import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from '@rxweb/reactive-form-validators';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-vendor-commision',
  templateUrl: './master-vendor-commision.component.html',
  styleUrls: ['./master-vendor-commision.component.css']
})
export class MasterVendorCommisionComponent implements OnInit {

 
  constructor(private allapi:AllapiService) { }
 
  hform= new UntypedFormGroup(
    {
      add_cat:new UntypedFormControl('',[Validators.required]),
      v_commission:new UntypedFormControl('',[Validators.required]),
      cat:new UntypedFormControl(''),
    });

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  search="";
  showadd=false;
edit=false;
  screen:any=0
  screenBody:any=0
  submitted=false;
  categoryname="";
  commission_id=0;
  commission_percentage="";
  additional_cat_id="";
  vendor_commission_list:any;
  add_cat_list:any;


  ngOnInit(): void {
    this.hform.controls['cat'].disable();

    let url='Hsn/get_commision_data/'
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        
        this.vendor_commission_list=JSON.parse(promise.vendor_commission_list).Table;
        this.add_cat_list=JSON.parse(promise.add_cat_list).Table;
 
      })
  }

 
 
  save_data()
  {

    this.submitted=true;
    if(this.hform.invalid)
    {
      return
    }
 
var data={
  "commission_id":this.commission_id,
"additional_category_id":parseInt(this.additional_cat_id),
"commission_percentage":parseInt(this.commission_percentage),
"language_id":1

}
let url='Hsn/save_commision_data/';
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
    this.vendor_commission_list=JSON.parse(promise.vendor_commission_list).Table;
    this.add_cat_list=JSON.parse(promise.add_cat_list).Table;
    this.showadd=false;
    this.commission_id=0;
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
  
    this.commission_id=ss.commission_id;
this.additional_cat_id=ss.additional_category_id;
this.hform.patchValue({
  add_cat: this.additional_cat_id
  });

this.categoryname=ss.additional_cat_name;
this.commission_percentage=ss.commission_percentage;
    this.showadd=true;
    this.edit=true;
  }



  show_add()
  {
    this.showadd=true;
    this.commission_id=0;
    this.submitted=false;
    this.edit=false;
    this.hform.reset();
  }
    showlist()
    {
      this.edit=false;
      this.showadd=false;
      this.commission_id=0;
      this.submitted=false;
      this.hform.reset();
    }
    clear()
    {
      this.edit=false;
      this.commission_id=0;
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
