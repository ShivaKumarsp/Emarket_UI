import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-check-consignment',
  templateUrl: './check-consignment.component.html',
  styleUrls: ['./check-consignment.component.css']
})
export class CheckConsignmentComponent implements OnInit {

  
  @ViewChild('printDiv') htmlData!: ElementRef;
  constructor(private httpClient: HttpClient,
    private formBuilder: UntypedFormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
   private spinner:NgxSpinnerService,
  ) { }
   searchForm = new UntypedFormGroup({
    consignmentid: new UntypedFormControl('',[Validators.required]),
    radiochange:new UntypedFormControl('',[Validators.required]),
    radioitem:new UntypedFormControl('')

  });
  page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";

  submitted=false;
  consignment_id="";
  check_radio="";
  radio_item="";
  search_consgnment_list:any;
  label_id="";
show_btnm=false;
   datePipe = new DatePipe('en-US');
   
  //validation
  get f(){
    return this.searchForm.controls;
  }
  check_consignment_details_list:any;
  order_item_list:any;

  ngOnInit(): void {
    this.check_consignment_details_list=[];
  }
  get_data()
  {
  
    this.submitted=true;
    if(this.searchForm.invalid)
    {
      return
    }
    var data={};
 if(this.check_radio=="Consignment")
 {
   data={
    "consignment_id":parseInt(this.consignment_id),
    "search_flg":this.check_radio,
    "language_id":1
    }
 }
 else  if(this.check_radio=="Tracking")
 {
   data={
    "tracking_id":this.consignment_id,
    "search_flg":this.check_radio,
    "language_id":1
    }
 }
 else  if(this.check_radio=="Order")
 {
   data={
    "order_id":parseInt(this.consignment_id),
    "search_flg":this.check_radio,
    "item_id":parseInt(this.radio_item),
    "language_id":1
    }
 }
   
    let url='Check_Consignment/get_Consignment_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.show_btnm=true;
        if(promise.status!="Failed")
        {
          this.show_btnm=true;
        this.check_consignment_details_list=promise.check_consignment_details_list;
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No Data Found.',
            showConfirmButton: false,
            timer: 3000
        })
        this.check_consignment_details_list=[];
        }
      })
  }
  get_order_item()
  {
   

    this.submitted=true;
    if(this.searchForm.invalid)
    {
      return
    }
    var data={
      "order_id":parseInt(this.consignment_id),
      "language_id":1
    }
    let url='Check_Consignment/get_order_item/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status!="Failed")
        {
        this.order_item_list=promise.order_item_list;
        if(this.order_item_list.length>0)
        {
          this.submitted=false;
          this.searchForm.controls["radioitem"].setValidators([Validators.required]);
          this.searchForm.controls["radioitem"].updateValueAndValidity();
          this.show_btnm=true;
        }
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No Data Found.',
            showConfirmButton: false,
            timer: 3000
        })
        this.order_item_list=[];
        }
      })
  }
  change_details(ss:any)
  {
if(ss=="Consignment")
{
  this.show_btnm=true;
this.label_id="Consignment Id";
this.consignment_id="";
this.order_item_list=[];
this.check_consignment_details_list=[];
this.searchForm.controls["radioitem"].setValidators(null);
this.searchForm.controls["radioitem"].updateValueAndValidity();
}
else if(ss=="Tracking")
{
  this.show_btnm=true;
  this.label_id="Tracking Id";
  this.consignment_id="";
  this.order_item_list=[];
  this.check_consignment_details_list=[];
  this.searchForm.controls["radioitem"].setValidators(null);
  this.searchForm.controls["radioitem"].updateValueAndValidity();
}
else if(ss=="Order")
{
  this.show_btnm=false;
  this.submitted=false;
  this.label_id="Order Id";
  this.consignment_id="";
  this.order_item_list=[];
  this.check_consignment_details_list=[];

}
  }
  clear()
  {
    this.label_id="";
    this.ngOnInit();
    this.submitted=false;
   this.searchForm.reset();
   this.order_item_list=[];
   this.show_btnm=false;
  }

 onTableDataChange(event: any) {
      this.page = event;   
  }

}

