import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-commission-process-list',
  templateUrl: './commission-process-list.component.html',
  styleUrls: ['./commission-process-list.component.css']
})
export class CommissionProcessListComponent implements OnInit {


  @ViewChild('printDiv') htmlData!: ElementRef;
  constructor(private httpClient: HttpClient,
    private formBuilder: UntypedFormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
   private spinner:NgxSpinnerService,
  ) { }
   orderGroup = new UntypedFormGroup({
    vstatus: new UntypedFormControl(''),
   
  });
  page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";

  submitted=false;
   formModel: any;
   commission_list:any; 
   commission_request_status:any;

   cancel_item_id=0;
   order_item_id=0;
   order_id=0;
   item_id=0;
   cancel_request_status="";
   cancel_request_reasion="";
   accept_order_count:any;
   reject_order_count:any;
   payment_method="";
   delivery_charge="";
   discount_amount="";
   tax_amount="";
   total_order_amount="";
   gross_amount="";
   payable_amount="";
   payment_status="";
   transaction_id="";
   fromdate="";
   todate="";
   min_dob:any;
   radio_check=false;

   getdata=new UntypedFormGroup({
    v_fromdate:new UntypedFormControl('',[Validators.required]),
    v_todate:new UntypedFormControl('',[Validators.required])
   })
   datePipe = new DatePipe('en-US');
   type="";
   commission_process_array:any;

  //validation
  get f(){
    return this.orderGroup.controls;
  }
  get g(){
    return this.getdata.controls;
  }
  ngOnInit(): void {
 
    this.min_dob=new Date();
    this.spinner.show();
   this.radio_check=false;

    let url='Commission_Report/get_account_commission_list/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.commission_list=JSON.parse(promise.commission_list).Table;
        this.commission_request_status=JSON.parse(promise.commission_request_status).Table;
        this.spinner.hide();
      })
      this.spinner.hide();
  }
 
  add_data(ss:any)
  {
   
if(this.commission_process_array!=undefined)
{
    if(ss.is_check==true)
      {
        this.commission_process_array.push({consignment_id:ss.consignment_id, order_id:ss.order_id, item_id:ss.item_id,
          commission_status_id:ss.commission_status_id,process_feedback:ss.process_feedback})
      }

      else if(ss.is_check==false)
      {
          this.commission_process_array.forEach((value: { consignment_id: any; },index: any)=>{
              if(value.consignment_id==ss.consignment_id) this.commission_process_array.splice(index,1);
          });

      }
    }
    else{
      this.commission_process_array=[];
      this.commission_process_array.push({consignment_id:ss.consignment_id, order_id:ss.order_id, item_id:ss.item_id,
        commission_status_id:ss.commission_status_id,process_feedback:ss.process_feedback})
    
    }
 

  }
  change_list(ss:any) {
 
   var s_fromdate = this.datePipe.transform(this.fromdate, 'MM-dd-yyyy');
   var s_todate = this.datePipe.transform(this.todate, 'MM-dd-yyyy');
    this.spinner.show();
    this.type=ss;
   var data={
   "type":ss,
    "language_id":1
   }
    let url='Commission_Report/get_commission_type_list/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.commission_list=JSON.parse(promise.commission_list).Table;
        this.spinner.hide();
      })
      this.spinner.hide();
  }
  change_data(ss:any, con:any)
  {
    this.commission_process_array.forEach((aa:any) => {
      if(aa.consignment_id==con)
      {
        aa.commission_status_id=ss;
      }
    });
  }
  change_text(ss:any, con:any)
  {
    this.commission_process_array.forEach((aa:any) => {
      if(aa.consignment_id==con)
      {
        aa.process_feedback=ss;
      }
    });
  }


  update_data()
  {
console.log(this.commission_process_array)
    if(this.commission_process_array==''||this.commission_process_array== undefined)
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Select Atleast One Checkbox',
        showConfirmButton: false,
        timer: 3000
      })
      return;
    }
    var data={
    
      "commission_process_array":this.commission_process_array,
      "type":this.type,
      "language_id":1
     }
      let url='Commission_Report/save_request_process_commission/';
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
            this.commission_list=JSON.parse(promise.commission_list).Table;
            this.commission_request_status=JSON.parse(promise.commission_request_status).Table;
          this.spinner.hide();
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
        });
        this.spinner.hide();
  }
 
  clear()
  {
    this.ngOnInit();
    this.submitted=false;
   this.getdata.reset();
  }
  change_todate()
  {
    this.todate="";
  }

 



  closeModal(){
    this.formModel.hide(); 
  }

 onTableDataChange(event: any) {
    this.page = event;
   
  }



}

