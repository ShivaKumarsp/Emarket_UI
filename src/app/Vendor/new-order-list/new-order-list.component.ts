import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

declare var window:any;
@Component({
  selector: 'app-new-order-list',
  templateUrl: './new-order-list.component.html',
  styleUrls: ['./new-order-list.component.css']
})
export class NewOrderListComponent implements OnInit {

 
  constructor(private httpClient: HttpClient,
    private formBuilder: UntypedFormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) { }
   orderGroup = new UntypedFormGroup({
    orderStatus: new UntypedFormControl('',[Validators.required]),
    orderRemark: new UntypedFormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(5)]),
    v_item_l:new UntypedFormControl('',[Validators.required]),
    v_item_b:new UntypedFormControl('',[Validators.required]),
    v_item_h:new UntypedFormControl('',[Validators.required]),
    v_item_w:new UntypedFormControl('',[Validators.required])
  });

  submitted=false;
   formModel: any;
   vendor_order_list:any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";
   order_item_id=0;
   order_id=0;
   item_id=0;
   order_accept_status="";
   order_accept_comment="";
   accept_order_count:any;
   reject_order_count:any;
   item_l="";
   item_b="";
   item_h="";
   item_w="";
   item_lbh_list:any;
   first_last_hub:any;
    first_hub_id="";
   last_hub_id="";
   i_show=false;
   item_variant:any;
  //validation
  get f(){
    return this.orderGroup.controls;
  }
  keyPressnumber(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    // (/[a-zA-Z0-9-_ ]/.test(inp))
    if (/[0-9.0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressSpace(event:any) {
    if(event.target.selectionStart===0 && event.code==='Space')
    {
      event.preventDefault();       
    }
  }

  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("allOrderModa55")
    );

    let url='VendorDashboard/get_all_order/'
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.item_variant=promise.item_variant;
        this.vendor_order_list=JSON.parse(promise.pending_order_list).Table;
      })
  }

  openModal(ss:any){
    this.submitted = false;
 
    this.first_hub_id="";
    this.last_hub_id="";
    var data={
      "order_item_id":ss.order_item_id,
      "order_id":ss.order_id,
      "item_id":ss.item_id
    }
    let url='Vendor_All_Order_List/get_item_lbh/';
 this.allapi.PostData(url, data).subscribe(promise=>
  {
    this.item_lbh_list=JSON.parse(promise.item_lbh_list).Table;
    if(this.item_lbh_list!="")
    {
       this.item_l=this.item_lbh_list[0].length;
       this.item_b=this.item_lbh_list[0].width;
       this.item_h=this.item_lbh_list[0].height;
       this.item_w=this.item_lbh_list[0].weight;
    }

    this.order_accept_status="";
    this.order_accept_comment="";
    if(ss.order_accept_status!='Pending')
    {
      this.order_accept_status=ss.order_accept_status;
      this.order_accept_comment=ss.order_accept_comment;
    }
   this.order_item_id=ss.order_item_id;
   this.order_id=ss.order_id;
  this.item_id=ss.item_id;
    this.formModel.show();
  })
  }


  closeModal(){
    this.formModel.hide();
  }

 onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

  update_order()
  {
   if(this.i_show==false)
   {
     this.item_l="1";
    this.item_b="1";
     this.item_h="1";
     this.item_w="1";
     this.orderGroup.value.v_item_l=1;
     this.orderGroup.value.v_item_b=1;
     this.orderGroup.value.v_item_h=1;
     this.orderGroup.value.v_item_w=1;
   }

   this.submitted = true;
   if (this.orderGroup.invalid) {
     return;
   }
   var data={};
  if(this.i_show==true)
  {
    data={
     "order_item_id":this.order_item_id,
     "order_id":this.order_id,
     "item_id":this.item_id,
     "order_accept_status":this.order_accept_status,
     "order_accept_comment":this.order_accept_comment,
     "item_l":parseInt(this.item_l),
      "item_b":parseInt(this.item_b),
      "item_h":parseInt(this.item_h),
      "item_w":parseInt(this.item_w),
     "language_id":1
     }
  }
  else if(this.i_show==false)
  {
    data={
     "order_item_id":this.order_item_id,
     "order_id":this.order_id,
     "item_id":this.item_id,
     "order_accept_status":this.order_accept_status,
     "order_accept_comment":this.order_accept_comment,
     "item_l":1,
      "item_b":1,
      "item_h":1,
      "item_w":1,
     "language_id":1
     }
  }
   
let url='VendorDashboard/update_order/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    if(promise.status=='Update')
    {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: promise.message,
        showConfirmButton: false,
        timer: 2000
    })
    this.order_accept_status="";
    this.order_accept_comment="";
    this.vendor_order_list=JSON.parse(promise.pending_order_list).Table;
    this.item_variant=promise.item_variant;
 
    this.formModel.hide();
    }
  })
  }

  change_data(ss:any)
  {
if(ss=='Accept')
{
 this.i_show=true;
}
else{
 this.i_show=false;
}
  }
  
}
