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
  selector: 'app-check-consignment-vendor',
  templateUrl: './check-consignment-vendor.component.html',
  styleUrls: ['./check-consignment-vendor.component.css']
})
export class CheckConsignmentVendorComponent implements OnInit {

  
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
   status_bar="0%";
   status_bar1="100%";
  submitted=false;
  consignment_id="";
  check_radio="";
  radio_item="";
  search_consgnment_list:any;
  label_id="";
show_btnm=false;
   datePipe = new DatePipe('en-US');
    ddate=new Date();
   
    created_date="";  
    approved_date="";
    packed_date="";
    ready_to_dispatch_date="";
    pickup_completed_date="";
    delivered_date="";
    check_consignment_details_list_vendor:any;
    order_item_list_vendor:any;
    vendor_order_item_track:any;
    vendor_order_item_track_details:any;
    vendor_order_item_track_price_details:any;
    vendor_tracking_list:any;
    order_date="";  
    order_status="";
    order_id="";
    buyer_name="";
    address_1="";
    address_2="";
    city="";
    country="";
    state="";
    pincode="";
    dispatch_date1="";
    dispatch_date2="";
    shipping_details="";
    mode_of_payment="";
    tracking_id="";

    image_url="";
    item_name="";
    sku="";
    hsn="";
    ian="";
    item_code="";

    quantity="";
    selling_price:any;
    shipping_price="";
    total_price:any;
    sgst="";
    cgst="";
    igst="";
    gst_total:any;

    imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';

  //validation
  get f(){
    return this.searchForm.controls;
  } 

  ngOnInit(): void {
    let url='Check_Consignment/get_vendor_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.vendor_tracking_list=promise.vendor_tracking_list;      
      })
      this.check_consignment_details_list_vendor=[];
      this.vendor_order_item_track=[];
      this.vendor_order_item_track_details=[];
      this.vendor_order_item_track_price_details=[];
      this.order_item_list_vendor=[];
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
   
    let url='Check_Consignment/get_Consignment_data_vendor/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.show_btnm=true;
        if(promise.status!="Failed")
        {
          this.show_btnm=true;
        this.check_consignment_details_list_vendor=promise.check_consignment_details_list_vendor;
        this.vendor_order_item_track=promise.vendor_order_item_track;
        this.vendor_order_item_track_details=promise.vendor_order_item_track_details;
        this.vendor_order_item_track_price_details=promise.vendor_order_item_track_price_details;

        this.order_date= this.vendor_order_item_track[0].order_date;  
        this.order_status=this.vendor_order_item_track[0].order_status;  
        this.order_id=this.vendor_order_item_track[0].order_id;  
        this.buyer_name=this.vendor_order_item_track[0].customer_name;  
        this.address_1=this.vendor_order_item_track[0].address_line_1;  
        this.address_2=this.vendor_order_item_track[0].address_line_2;  
        this.city=this.vendor_order_item_track[0].city;  
        this.country=this.vendor_order_item_track[0].country_name;  
        this.state=this.vendor_order_item_track[0].state_name;  
        this.pincode=this.vendor_order_item_track[0].pincode;  
        this.dispatch_date1=this.vendor_order_item_track[0].dispatch_date_1;  
        this.dispatch_date2=this.vendor_order_item_track[0].dispatch_date_2;  
        this.shipping_details=this.vendor_order_item_track[0].shipping_details;  
        this.mode_of_payment=this.vendor_order_item_track[0].payment_mode;  
        this.tracking_id=this.vendor_order_item_track[0].tracking_id;  

        this.image_url=this.vendor_order_item_track_details[0].item_image; 
        this.item_name=this.vendor_order_item_track_details[0].item_name; 
        this.sku=this.vendor_order_item_track_details[0].sku; 
        this.hsn=this.vendor_order_item_track_details[0].hsn_code; 
        this.ian=this.vendor_order_item_track_details[0].ian_code; 
        this.item_code=this.vendor_order_item_track_details[0].item_code; 

        this.quantity=this.vendor_order_item_track_price_details[0].quantity; 
        this.selling_price=this.vendor_order_item_track_price_details[0].selling_price; 
        this.shipping_price=this.vendor_order_item_track_price_details[0].shipping_price; 
        this.total_price=this.vendor_order_item_track_price_details[0].total_price; 
        this.sgst=this.vendor_order_item_track_price_details[0].sgst; 
        this.cgst=this.vendor_order_item_track_price_details[0].cgst; 
        this.igst=this.vendor_order_item_track_price_details[0].igst; 
        this.gst_total=this.vendor_order_item_track_price_details[0].gst_total; 

        this.created_date="";  
        this.approved_date="";
        this.packed_date="";
        this.ready_to_dispatch_date="";
        this.pickup_completed_date="";
        this.delivered_date="";
       
        if( this.check_consignment_details_list_vendor.length==1)
        {
          this.status_bar='7%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==2)
        {
          this.status_bar='22%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==3)
        {
          this.status_bar='40%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==4)
        {
          this.status_bar='57%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
        }

        if( this.check_consignment_details_list_vendor.length==5)
        {
          this.status_bar='72%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
          this.pickup_completed_date=this.check_consignment_details_list_vendor[4].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==6)
        {
          this.status_bar='83%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
          this.pickup_completed_date=this.check_consignment_details_list_vendor[4].updated_on;
          this.delivered_date=this.check_consignment_details_list_vendor[5].updated_on;
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
        this.check_consignment_details_list_vendor=[];
        }
      })
  }
  get_data_new(ss:any)
  {
    this.label_id="";
this.check_radio="";
this.consignment_id="";
this.order_item_list_vendor=[];

   var data={
      "consignment_id":parseInt(ss.consignment_id),
      "search_flg":"Consignment",
      "language_id":1
      }  
    let url='Check_Consignment/get_Consignment_data_vendor/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
      
        if(promise.status!="Failed")
        {
          this.show_btnm=false;
        this.check_consignment_details_list_vendor=promise.check_consignment_details_list_vendor;
        this.vendor_order_item_track=promise.vendor_order_item_track;
        this.vendor_order_item_track_details=promise.vendor_order_item_track_details;
        this.vendor_order_item_track_price_details=promise.vendor_order_item_track_price_details;

        this.order_date= this.vendor_order_item_track[0].order_date;  
        this.order_status=this.vendor_order_item_track[0].order_status;  
        this.order_id=this.vendor_order_item_track[0].order_id;  
        this.buyer_name=this.vendor_order_item_track[0].customer_name;  
        this.address_1=this.vendor_order_item_track[0].address_line_1;  
        this.address_2=this.vendor_order_item_track[0].address_line_2;  
        this.city=this.vendor_order_item_track[0].city;  
        this.country=this.vendor_order_item_track[0].country_name;  
        this.state=this.vendor_order_item_track[0].state_name;  
        this.pincode=this.vendor_order_item_track[0].pincode;  
        this.dispatch_date1=this.vendor_order_item_track[0].dispatch_date_1;  
        this.dispatch_date2=this.vendor_order_item_track[0].dispatch_date_2;  
        this.shipping_details=this.vendor_order_item_track[0].shipping_details;  
        this.mode_of_payment=this.vendor_order_item_track[0].payment_mode;  
        this.tracking_id=this.vendor_order_item_track[0].tracking_id;  

        this.image_url=this.vendor_order_item_track_details[0].item_image; 
        this.item_name=this.vendor_order_item_track_details[0].item_name; 
        this.sku=this.vendor_order_item_track_details[0].sku; 
        this.hsn=this.vendor_order_item_track_details[0].hsn_code; 
        this.ian=this.vendor_order_item_track_details[0].ian_code; 
        this.item_code=this.vendor_order_item_track_details[0].item_code; 

        this.quantity=this.vendor_order_item_track_price_details[0].quantity; 
        this.selling_price=this.vendor_order_item_track_price_details[0].selling_price; 
        this.shipping_price=this.vendor_order_item_track_price_details[0].shipping_price; 
        this.total_price=this.vendor_order_item_track_price_details[0].total_price; 
        this.sgst=this.vendor_order_item_track_price_details[0].sgst; 
        this.cgst=this.vendor_order_item_track_price_details[0].cgst; 
        this.igst=this.vendor_order_item_track_price_details[0].igst; 
        this.gst_total=this.vendor_order_item_track_price_details[0].gst_total; 

        this.created_date="";  
        this.approved_date="";
        this.packed_date="";
        this.ready_to_dispatch_date="";
        this.pickup_completed_date="";
        this.delivered_date="";
       
        if( this.check_consignment_details_list_vendor.length==1)
        {
          this.status_bar='7%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==2)
        {
          this.status_bar='22%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==3)
        {
          this.status_bar='40%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==4)
        {
          this.status_bar='57%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
        }

        if( this.check_consignment_details_list_vendor.length==5)
        {
          this.status_bar='72%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
          this.pickup_completed_date=this.check_consignment_details_list_vendor[4].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==6)
        {
          this.status_bar='83%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
          this.pickup_completed_date=this.check_consignment_details_list_vendor[4].updated_on;
          this.delivered_date=this.check_consignment_details_list_vendor[5].updated_on;
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
        this.check_consignment_details_list_vendor=[];
        }
      })
  }
  get_data_order(ss:any)
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
    "item_id":parseInt(ss.item_id),
    "language_id":1
    }
 }
   
    let url='Check_Consignment/get_Consignment_data_vendor/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.show_btnm=true;
        if(promise.status!="Failed")
        {
          this.show_btnm=true;
        this.check_consignment_details_list_vendor=promise.check_consignment_details_list_vendor;
        this.vendor_order_item_track=promise.vendor_order_item_track;
        this.vendor_order_item_track_details=promise.vendor_order_item_track_details;
        this.vendor_order_item_track_price_details=promise.vendor_order_item_track_price_details;

        this.order_date= this.vendor_order_item_track[0].order_date;  
        this.order_status=this.vendor_order_item_track[0].order_status;  
        this.order_id=this.vendor_order_item_track[0].order_id;  
        this.buyer_name=this.vendor_order_item_track[0].customer_name;  
        this.address_1=this.vendor_order_item_track[0].address_line_1;  
        this.address_2=this.vendor_order_item_track[0].address_line_2;  
        this.city=this.vendor_order_item_track[0].city;  
        this.country=this.vendor_order_item_track[0].country_name;  
        this.state=this.vendor_order_item_track[0].state_name;  
        this.pincode=this.vendor_order_item_track[0].pincode;  
        this.dispatch_date1=this.vendor_order_item_track[0].dispatch_date_1;  
        this.dispatch_date2=this.vendor_order_item_track[0].dispatch_date_2;  
        this.shipping_details=this.vendor_order_item_track[0].shipping_details;  
        this.mode_of_payment=this.vendor_order_item_track[0].payment_mode;  
        this.tracking_id=this.vendor_order_item_track[0].tracking_id;  

        this.image_url=this.vendor_order_item_track_details[0].item_image; 
        this.item_name=this.vendor_order_item_track_details[0].item_name; 
        this.sku=this.vendor_order_item_track_details[0].sku; 
        this.hsn=this.vendor_order_item_track_details[0].hsn_code; 
        this.ian=this.vendor_order_item_track_details[0].ian_code; 
        this.item_code=this.vendor_order_item_track_details[0].item_code; 

        this.quantity=this.vendor_order_item_track_price_details[0].quantity; 
        this.selling_price=this.vendor_order_item_track_price_details[0].selling_price; 
        this.shipping_price=this.vendor_order_item_track_price_details[0].shipping_price; 
        this.total_price=this.vendor_order_item_track_price_details[0].total_price; 
        this.sgst=this.vendor_order_item_track_price_details[0].sgst; 
        this.cgst=this.vendor_order_item_track_price_details[0].cgst; 
        this.igst=this.vendor_order_item_track_price_details[0].igst; 
        this.gst_total=this.vendor_order_item_track_price_details[0].gst_total; 

        this.created_date="";  
        this.approved_date="";
        this.packed_date="";
        this.ready_to_dispatch_date="";
        this.pickup_completed_date="";
        this.delivered_date="";
       
        if( this.check_consignment_details_list_vendor.length==1)
        {
          this.status_bar='7%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==2)
        {
          this.status_bar='22%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==3)
        {
          this.status_bar='40%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==4)
        {
          this.status_bar='57%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
        }

        if( this.check_consignment_details_list_vendor.length==5)
        {
          this.status_bar='72%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
          this.pickup_completed_date=this.check_consignment_details_list_vendor[4].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==6)
        {
          this.status_bar='83%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
          this.pickup_completed_date=this.check_consignment_details_list_vendor[4].updated_on;
          this.delivered_date=this.check_consignment_details_list_vendor[5].updated_on;
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
        this.check_consignment_details_list_vendor=[];
        }
      })
  }

  get_data_view(ss:any)
  {  
 var data={
  "order_id":parseInt(ss.order_id),
  "search_flg":this.check_radio,
  "item_id":parseInt(ss.item_id),
  "language_id":1
  }   
    let url='Check_Consignment/get_Consignment_data_vendor/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.show_btnm=true;
        if(promise.status!="Failed")
        {
          this.show_btnm=true;
        this.check_consignment_details_list_vendor=promise.check_consignment_details_list_vendor;
        this.vendor_order_item_track=promise.vendor_order_item_track;
        this.vendor_order_item_track_details=promise.vendor_order_item_track_details;
        this.vendor_order_item_track_price_details=promise.vendor_order_item_track_price_details;

        this.order_date= this.vendor_order_item_track[0].order_date;  
        this.order_status=this.vendor_order_item_track[0].order_status;  
        this.order_id=this.vendor_order_item_track[0].order_id;  
        this.buyer_name=this.vendor_order_item_track[0].customer_name;  
        this.address_1=this.vendor_order_item_track[0].address_line_1;  
        this.address_2=this.vendor_order_item_track[0].address_line_2;  
        this.city=this.vendor_order_item_track[0].city;  
        this.country=this.vendor_order_item_track[0].country_name;  
        this.state=this.vendor_order_item_track[0].state_name;  
        this.pincode=this.vendor_order_item_track[0].pincode;  
        this.dispatch_date1=this.vendor_order_item_track[0].dispatch_date_1;  
        this.dispatch_date2=this.vendor_order_item_track[0].dispatch_date_2;  
        this.shipping_details=this.vendor_order_item_track[0].shipping_details;  
        this.mode_of_payment=this.vendor_order_item_track[0].payment_mode;  
        this.tracking_id=this.vendor_order_item_track[0].tracking_id;  

        this.image_url=this.vendor_order_item_track_details[0].item_image; 
        this.item_name=this.vendor_order_item_track_details[0].item_name; 
        this.sku=this.vendor_order_item_track_details[0].sku; 
        this.hsn=this.vendor_order_item_track_details[0].hsn_code; 
        this.ian=this.vendor_order_item_track_details[0].ian_code; 
        this.item_code=this.vendor_order_item_track_details[0].item_code; 

        this.quantity=this.vendor_order_item_track_price_details[0].quantity; 
        this.selling_price=this.vendor_order_item_track_price_details[0].selling_price; 
        this.shipping_price=this.vendor_order_item_track_price_details[0].shipping_price; 
        this.total_price=this.vendor_order_item_track_price_details[0].total_price; 
        this.sgst=this.vendor_order_item_track_price_details[0].sgst; 
        this.cgst=this.vendor_order_item_track_price_details[0].cgst; 
        this.igst=this.vendor_order_item_track_price_details[0].igst; 
        this.gst_total=this.vendor_order_item_track_price_details[0].gst_total; 

        this.created_date="";  
        this.approved_date="";
        this.packed_date="";
        this.ready_to_dispatch_date="";
        this.pickup_completed_date="";
        this.delivered_date="";
       
        if( this.check_consignment_details_list_vendor.length==1)
        {
          this.status_bar='7%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==2)
        {
          this.status_bar='22%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==3)
        {
          this.status_bar='40%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==4)
        {
          this.status_bar='57%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
        }

        if( this.check_consignment_details_list_vendor.length==5)
        {
          this.status_bar='72%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
          this.pickup_completed_date=this.check_consignment_details_list_vendor[4].updated_on;
        }
        if( this.check_consignment_details_list_vendor.length==6)
        {
          this.status_bar='83%';
          this.created_date=this.check_consignment_details_list_vendor[0].updated_on;
          this.approved_date=this.check_consignment_details_list_vendor[1].updated_on;
          this.packed_date=this.check_consignment_details_list_vendor[2].updated_on;
          this.ready_to_dispatch_date=this.check_consignment_details_list_vendor[3].updated_on;
          this.pickup_completed_date=this.check_consignment_details_list_vendor[4].updated_on;
          this.delivered_date=this.check_consignment_details_list_vendor[5].updated_on;
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
        this.check_consignment_details_list_vendor=[];
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
    let url='Check_Consignment/get_order_item_vendor/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
            
        this.order_item_list_vendor=promise.order_item_list_vendor;
        if(this.order_item_list_vendor.length>0)
        {
          this.show_btnm=false;
        }
        
        else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No Data Found.',
            showConfirmButton: false,
            timer: 3000
        })
        this.order_item_list_vendor=[];
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
this.order_item_list_vendor=[];
this.check_consignment_details_list_vendor=[];
this.vendor_order_item_track=[];
this.vendor_order_item_track_details=[];
this.vendor_order_item_track_price_details=[];
// this.searchForm.controls["radioitem"].setValidators(null);
// this.searchForm.controls["radioitem"].updateValueAndValidity();
}
else if(ss=="Tracking")
{
  this.vendor_order_item_track=[];
this.vendor_order_item_track_details=[];
this.vendor_order_item_track_price_details=[];
  this.show_btnm=true;
  this.label_id="Tracking Id";
  this.consignment_id="";
  this.order_item_list_vendor=[];
  this.check_consignment_details_list_vendor=[];
  this.searchForm.controls["radioitem"].setValidators(null);
  this.searchForm.controls["radioitem"].updateValueAndValidity();
}
else if(ss=="Order")
{
  this.vendor_order_item_track=[];
this.vendor_order_item_track_details=[];
this.vendor_order_item_track_price_details=[];
  this.show_btnm=false;
  this.submitted=false;
  this.label_id="Order Id";
  this.consignment_id="";
  this.order_item_list_vendor=[];
  this.check_consignment_details_list_vendor=[];

}
  }
  clear()
  {
    this.label_id="";
    this.ngOnInit();
    this.submitted=false;
   this.searchForm.reset();
   this.order_item_list_vendor=[];
   this.show_btnm=false;
  }

 onTableDataChange(event: any) {
      this.page = event;   
  }

}

