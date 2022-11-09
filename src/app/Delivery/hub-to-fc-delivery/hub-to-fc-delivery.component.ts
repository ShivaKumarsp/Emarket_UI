import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-hub-to-fc-delivery',
  templateUrl: './hub-to-fc-delivery.component.html',
  styleUrls: ['./hub-to-fc-delivery.component.css']
})
export class HubToFcDeliveryComponent implements OnInit {

  
  page:any=1
  forms=new UntypedFormGroup({});
  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private authService:AuthService,
   private formBuilder:UntypedFormBuilder) { }

   total = 0;
   page1: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [3, 6, 9, 12];
   search="";
   submitted=false;
   reasion="";
   consignment_id=0;
   order_item_id=0;
   page2: number = 1;
   count1: number = 0;
   tableSize1: number = 5;
   search1="";
   request_delivery_list:any;
   pickup_delivery_list:any;
   drop_delivery_list:any;
   formModel:any;
   form=new UntypedFormGroup({
    v_reasion:new UntypedFormControl('',[Validators.required])
  })
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
        document.getElementById("reasionmodule")
      );
   let url='Hub_To_Fc_Delivery/get_data/';
   this.allapi.GetDataById(url,1).subscribe(promise=>{
    this.request_delivery_list=promise.request_delivery_list;
    this.pickup_delivery_list=promise.pickup_delivery_list;
    this.drop_delivery_list=promise.drop_delivery_list;
   })
  }

  onTableDataChange(event: any) {
    this.page1 = event;
    this.ngOnInit();
  }

  onTableDataChange1(event: any) {
    this.page2 = event;
    this.ngOnInit();
  }
  acceptingParcel(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Accept This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "consignment_id": ss.consignment_id,
                "language_id": 1
            }
            let url='Hub_To_Fc_Delivery/accept_hub_to_fc/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Consignment Accepted Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Consignment Failed Accepte',
                        showConfirmButton: false,
                        timer: 3000
                    })
            
                }
            })
  
        }
    })
  
  };

  open_rejectmodule(ss:any) {  
    this.consignment_id=ss.consignment_id;
  this.order_item_id=ss.order_item_id;
  this.reasion="";
  this.formModel.show();
  };

  rejectParcel() {
    if(this.reasion.trim()=="")
    {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please Enter Reasion',
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }
    this.submitted=true;
    if(this.form.invalid)
    {
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Reject This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reject it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "consignment_id": this.consignment_id,
                "reasion":this.reasion,
                "language_id": 1
            }
            let url='Hub_To_Fc_Delivery/reject_hub_to_fc/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Reject") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                  this.formModel.hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Consignment Rejected Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Order Failed Reject',
                        showConfirmButton: false,
                        timer: 3000
                    })
            
                }
            })
  
        }
    })
  
  };
  pickupParcel(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Pickup This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Pickup it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "consignment_id": ss.consignment_id,
                "language_id": 1
            }
            let url='Hub_To_Fc_Delivery/pickup_hub_to_fc/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Consignment Pickup Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Order Failed pickup',
                        showConfirmButton: false,
                        timer: 3000
                    })
            
                }
            })
  
        }
    })
  
  };

  deliverParcel(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Deliver This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Deliver it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "consignment_id": ss.consignment_id,
                "order_item_id":ss.order_item_id,
                "language_id": 1
            }
            let url='Hub_To_Fc_Delivery/deliver_from_hub_to_fc/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Consignment Delivered Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Order Not Delivered',
                        showConfirmButton: false,
                        timer: 3000
                    })
                   
                }
            })
  
        }
    })
  
  };

  onSubmit(){
    console.log(this.forms.value)
  }



}
