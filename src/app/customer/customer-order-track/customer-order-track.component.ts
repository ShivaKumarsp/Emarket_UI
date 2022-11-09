import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
declare var Razorpay: any; 

@Component({
  selector: 'app-customer-order-track',
  templateUrl: './customer-order-track.component.html',
  styleUrls: ['./customer-order-track.component.css']
})
export class CustomerOrderTrackComponent implements OnInit {

  public data:any;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private authService:AuthService) { }
   public orderid:any;
   total=0;
   gst_amount=0;
   pay_count=0;
   delivery_count=0;
  customer_order_item_list:any;    
  customer_shipping_address:any;
  customer_invoice_address:any;
  customer_name="";
  customerlist:any;
  p_imageurl="";
  first_name="";
  second_name="";
  customer_order_details:any;
  order_amount_list:any;
  payableamount=0;
  base64="data:image/jpeg;base64,";
  imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  gross_amount=0;
  delivery_charge=0;
  discount_amount=0;
  payable_amount=0;
  payment_method_id=0;
  payment_status="";
  payment_orderid="";
  customername5="";
  emailid5="";
  mob5="";
  order_id=0;
  item_variant:any;
  
  ngOnInit(): void {
    this.orderid=sessionStorage.getItem('orderid');
    let url = 'Customer_Order_Track/get_item_data/';
var data={
  "order_id":parseInt(this.orderid),
  "language_id":1
}
    this.allapi.PostData(url,data).subscribe(response => {
      this.item_variant=response.item_variant;
      this.customer_order_details=JSON.parse(response.customer_order_details).Table;
     this.payableamount=this.customer_order_details[0].payable_amount;
     this.order_amount_list=response.order_amount_list;
     if(this.order_amount_list.length>0)
     {
     this.gross_amount=this.order_amount_list[0].gross_amount;
     this.delivery_charge=this.order_amount_list[0].delivery_charge;
     this.discount_amount=this.order_amount_list[0].discount_amount;
     this.payable_amount=this.order_amount_list[0].payable_amount;
     this.payment_method_id=this.order_amount_list[0].payment_method_id;
     this.payment_status=this.order_amount_list[0].payment_status;
     this.order_id=this.order_amount_list[0].order_id;
     }

   if(response.customer_order_item_list!="")
   {
         this.customer_order_item_list=response.customer_order_item_list;
         this.customer_shipping_address=response.customer_shipping_address;
         this.customer_invoice_address=response.customer_invoice_address;
         //this.customer_name=response.customer_name;
       
   }   
   this.pay_count=0;
var p_count=0;
   this.customer_order_item_list.forEach((ss:any) => {
    if(ss.status_id==6)
    {
      p_count=p_count+1;
    }
   });

   this.pay_count=0;
   this.delivery_count=0;
   var d_count=0;
      this.customer_order_item_list.forEach((ss:any) => {
       if(ss.status_id==5)
       {
        d_count=d_count+1;
       }
      });

    if(this.customer_order_item_list.length==p_count)
    {
      this.pay_count=1;
    }
    if(this.customer_order_item_list.length==d_count)
    {
      this.delivery_count=1;
    }
    

   var total = 0;
   var gstamount=0;
            for (var i = 0; i <this.customer_order_item_list.length; i++) {
                var product = this.customer_order_item_list[i];
                total += (product.sellingprice * product.v_quantity);
                gstamount += (product.tax_amount * product.v_quantity);
            }
           this.total=total; 
           this.gst_amount=gstamount;
 });
    

  }

  pay_online()
  {
    var data = {
     
      "payable_amount": this.payableamount,      
  }

    let url='Customer_Order_Track/CheckOut_online/';
 
    this.allapi.PostData(url,data).subscribe(promise=>{
      if(promise.status=="Insert")
      {
      this.payment_orderid = promise.payment_orderid;
      this.customername5 = promise.customer_name;
      sessionStorage.setItem('name',promise.customer_name);
      this.emailid5 = promise.email;
      this.mob5 = promise.mobile;

          this.razorpay(this.payment_orderid);
      }
      else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Failed To Payment, Please Try Again',
          showConfirmButton: false,
          timer: 3000
      })
      }
      
    })
  }
  view_item_details(ss:any)
  {     
  sessionStorage.setItem('orderid',ss.orderid);
 sessionStorage.setItem('itemid',ss.itemid);
   window.location.replace("/app/orderhistory/customerordertrack/orderitemdetails")
  }


  razorpay (ss:any) {

    var options = {
        "name": 'Avani Infosoft',
        "order_id": ss,
        "currency": "INR",
        "description": "ONLINE PAYMENT",
        "image": "http://www.avaniinfosoft.com/support/img/avani.ico",
        "handler": function (response:any) {
        var payment_id=  response.razorpay_payment_id;
         var ord_id=  response.razorpay_order_id;
        
         var event = new CustomEvent("payment.success", 
         {
             detail: response,
             bubbles: true,
             cancelable: true
         }
     );    
     window.dispatchEvent(event);
   
        },
    

        "prefill": {
            "name":  this.customername5,
            "email": this.emailid5,
            "contact": this.mob5
        },

        "theme": {
            "color": "#F37254"
        },

    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response:any){    
      
      
    }
    );

}



@HostListener('window:payment.success', ['$event']) 
onPaymentSuccess(event:any): void {
    if(event.detail.razorpay_payment_id!="")
    {
     
   let url='Customer_Order_Track/paymentsave/';
   var data = {
    "payment_transaction_id": event.detail.razorpay_payment_id,
    "payment_order_id": event.detail.razorpay_order_id,
    "order_id":this.order_id,      
     "payable_amount": this.payableamount, 
     "language_id":1
       };
   this.allapi.PostData(url,data).subscribe(promise=>
       {
           if (promise.status == "Insert") {
            this.customer_order_details=JSON.parse(promise.customer_order_details).Table;
     this.payableamount=this.customer_order_details[0].payable_amount;
     this.order_amount_list=promise.order_amount_list;
     if(this.order_amount_list.length>0)
     {
     this.gross_amount=this.order_amount_list[0].gross_amount;
     this.delivery_charge=this.order_amount_list[0].delivery_charge;
     this.discount_amount=this.order_amount_list[0].discount_amount;
     this.payable_amount=this.order_amount_list[0].payable_amount;
     this.payment_method_id=this.order_amount_list[0].payment_method_id;
     this.payment_status=this.order_amount_list[0].payment_status;
     this.order_id=this.order_amount_list[0].payment_status;
     }

   if(promise.customer_order_item_list!="")
   {
         this.customer_order_item_list=promise.customer_order_item_list;
         this.customer_shipping_address=promise.customer_shipping_address;
         this.customer_invoice_address=promise.customer_invoice_address;
         //this.customer_name=response.customer_name;
       
   }   
   var total = 0;
   var gstamount=0;
            for (var i = 0; i <this.customer_order_item_list.length; i++) {
                var product = this.customer_order_item_list[i];
                total += (product.sellingprice * product.v_quantity);
                gstamount += (product.tax_amount * product.v_quantity);
            }
           this.total=total; 
           this.gst_amount=gstamount;

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Payment Received Successfully',
              showConfirmButton: false,
              timer: 3000
          })
              
           }
           else {
               Swal.fire({
                   position: 'center',
                   icon: 'warning',
                   title: 'Somthing Wrong, Please Try again',
                   showConfirmButton: false,
                   timer: 3000
               })
           }
          
       })
    }
}




}
