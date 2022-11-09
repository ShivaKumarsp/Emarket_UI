import { HttpClient } from '@angular/common/http';
import { Component, HostListener,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var Razorpay: any;
import Graph from 'graphology';
import { dijkstra, edgePathFromNodePath } from 'graphology-shortest-path';


@Component({
  selector: 'app-cart-check-out-placeorder',
  templateUrl: './cart-check-out-placeorder.component.html',
  styleUrls: ['./cart-check-out-placeorder.component.css']
})
export class CartCheckOutPlaceorderComponent implements OnInit {
    winRef: any;

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService) { }
   public mycartlist:any;
   public  mycartlist1:any;
   public total:any;
   public totalqty:any;
   public gstamount:any;
   public payableamount:any;
   public mycartlist_json:any;
   public cartcount="";
   shippingaddress_id=0;
   modeofpayment="";
   payment_orderid="";
   orderid="";
   customername5="";
   emailid5="";
   mob5="";
   item_variant:any;

   public razorpay_payment_id="";
   public razorpay_order_id="";
   base64='data:image/jpeg;base64,';
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
   
   
  // Route cal start  
  first_hub_id = '';
  last_hub_id = '';
 starts="";
 ends="";
 graph: any;
 all_str: any = [];
 all: any = [];
 tempTimeTravel: any = {};
 tempDepartureTime: any = {};
 finallyReachDateTime: any = [];
 finallyReachRoute: any = [];
 routeSelected: any;
 allhub_max: any;
 allhub_max_new: any;
 tempArr: any = [];
 source_dest_hub:any;
 finalDate_on:any;
 hub_list_1:any;
 hub_list_2:any;
 hub_route_list:any;
 item_delivery_date:any;
delivery_time="";
pincode="";
  // route cal end


  ngOnInit(): void {
let url='CartCheckout/get_payment_data/';
      var data = {
          "language_id": 1
      }
      this.allapi.PostData(url,data).subscribe(promise=> {
        this.item_variant=promise.item_variant;
if(promise.cartcount>0)
{
            this.mycartlist_json=sessionStorage.getItem('mycartlist_json');
            this.mycartlist = JSON.parse(this.mycartlist_json);
            if (this.mycartlist != "") {
             var total = 0;
             var gst_amount=0;
             var totalqty = 0;
             for (var i = 0; i < this.mycartlist.length; i++) {
                 var product = this.mycartlist[i];
                 total += (product.selling_price * product.quantity);
                 totalqty += ( product.quantity);
                // gst_amount+=(product.gst_amount* product.quantity);
             }
             this.total = total;
             this.totalqty = totalqty;
             this.gstamount = gst_amount;
             this.payableamount = total;
             this.cartcount = promise.mycartlist.length;
             
            
// Item delivery time cal start
this.mycartlist.forEach((ss:any)=> {   

    var myroute = ''; 
    this.starts = '';
    this.ends = '';
    var data={
       "item_id": ss.itemid,
      "language_id":1,    
    }
    let url='Landing_Item_Details/get_hub_id_customer/';
    this.allapi.PostData_userid(url,data).subscribe(promise=>
      { 
        this.hub_list_1 = JSON.parse(promise.hub_list_1).Table;
        this.hub_list_2 = JSON.parse(promise.hub_list_2).Table;    
        this.hub_route_list = JSON.parse(promise.hub_route_list).Table;

      this.source_dest_hub=promise.source_dest_hub; 
      this.first_hub_id = this.source_dest_hub[0].source_hub_id.toString();
      this.last_hub_id = this.source_dest_hub[0].destination_hub_id.toString();
   
    this.starts = this.first_hub_id.toString();
    this.ends = this.last_hub_id.toString();
    if (this.starts != this.ends) {
      this.graph = new Graph({ allowSelfLoops: false });
      this.hub_list_1.forEach((i: any) => {
        this.graph.addNode(i.hub_id.toString());
      });
      this.hub_route_list.forEach((i: any) => {
        if (
          !this.graph.hasEdge(
            i.source_hub_id.toString(),
            i.destination_hub_id.toString()
          )
        ) {
          this.graph.addDirectedEdge(
            i.source_hub_id.toString(),
            i.destination_hub_id.toString(),
            { travel_time: i.travel_time, departure_time: i.departure_time,transport_id:i.transport_id,transport_mode_id:i.transport_mode_id }
          );
        }
      });
      this.graph.forEachOutNeighbor(this.starts, (neighbor: any) => {
        let newGraph = dijkstra.bidirectional(this.graph, neighbor, this.ends);
        if (newGraph) {
          let str = this.starts + newGraph.join('');
          if (this.all_str.indexOf(str) === -1) {
            let a = [this.starts, ...newGraph];
            this.all.push(a);
            this.all_str.push(str);
            this.next(a);
          }
        }
      });

      this.hub_route_list.forEach((routes: any, index: any) => {
       // console.log(this.graph)
        let _hub1 = routes.source_hub_id.toString();
        let _hub2 = routes.destination_hub_id.toString();
        let _travel_time = routes.travel_time;
        let _departure_time = routes.departure_time
        let _transport_id = routes.transport_id
        let _transport_mode_id = routes.transport_mode_id
       

        //this.tempTimeTravel.push(_obj)
        let a = this.tempTimeTravel[_hub1 + '->' + _hub2];
        if (a) {
          if (a.length > 0) {
            this.tempTimeTravel[_hub1 + '->' + _hub2] = [a[0], _travel_time];
          }
        } else {
          this.tempTimeTravel[_hub1 + '->' + _hub2] = [_travel_time];
        }

        let b = this.tempDepartureTime[_hub1 + '->' + _hub2];
        if (b) {
          if (b.length > 0) {
            this.tempDepartureTime[_hub1 + '->' + _hub2] = [
              b[0],
              _departure_time,
            ];
          }
        } else {
          this.tempDepartureTime[_hub1 + '->' + _hub2] = [_departure_time];
        }
      });
      let windows: any = {};
      this.all.forEach((route: any) => {
        
        let d = new Date();
        this.routeSelected = route;
        
        let tempArr: any = [];
        route.forEach((node: any, i: any) => {
          if (i <= route.length - 2) {
            let hub1 = node;
            let hub2 = route[i + 1];
            let travelHour = this.getleastHour(this.tempTimeTravel[hub1 + '->' + hub2]);
            let _thour= Math.round(travelHour/60)
            let _tmin = travelHour - 60*_thour
            let WindowTime = this.getWindow(this.tempDepartureTime[hub1 + '->' + hub2],d);
            let newWindowTime = new Date(
              WindowTime.getFullYear(),
              WindowTime.getMonth(),
              WindowTime.getDate(),
              WindowTime.getHours() + _thour,
              WindowTime.getMinutes() + _tmin,
              0
            );

            d = new Date(newWindowTime);
            
            tempArr.push(WindowTime);
          }
        });
        let routeCode = route.join().replaceAll(',', '');
        windows[routeCode] = tempArr;

        this.finallyReachDateTime.push(d);
        this.finallyReachRoute.push(route);
        

      });
      let _finalReachTime = this.leastVal(this.finallyReachDateTime);
      let finalDateTime =
        this.finallyReachDateTime[
          this.finallyReachDateTime.indexOf(_finalReachTime)
        ];
      let finalRoute =
        this.finallyReachRoute[
          this.finallyReachDateTime.indexOf(_finalReachTime)
        ];

      let finalwindows = windows[finalRoute.join().replaceAll(',', '')];
      this.finalDate_on=finalDateTime;
      myroute = finalRoute.toString();
      //console.log('Selected Route',finalRoute)
     //console.log('windows',windows)
      //console.log('Reaching on ',finalDateTime)
      this.allhub_max = [];
      finalwindows.forEach((wtime: any, i: any) => {
        // console.log(finalRoute[i],finalRoute[i+1],wtime)
        this.allhub_max.push({
          first_hub_id: parseInt(finalRoute[i]),
          last_hub_id: parseInt(finalRoute[i + 1]),
          movement_date_time: wtime,
        });
      });
    } else {
      var dd = new Date();
      this.allhub_max = [];
      this.allhub_max.push({
        first_hub_id: parseInt(this.starts),
        last_hub_id: parseInt(this.ends),
        movement_date_time: dd,
      });
      myroute = (this.starts + ',' + this.ends).toString();
     
    }

    //alert(this.finalDate_on) 
 
          this.item_delivery_date=promise.item_delivery_date;         
          if(promise.check_delivery==0)
          {
        
          if(this.item_delivery_date[0].delivery_date!=null &&  this.item_delivery_date[0].delivery_date!="")
          {
           
            this.delivery_time="";
           this.delivery_time=this.item_delivery_date[0].delivery_date;
           this.pincode=promise.pincode;
          }
          else
          {  
           
             this.delivery_time=""; 
            var _date =this.finalDate_on;
           var _date_new= _date.setDate( _date.getDate() + 2 );      
           this.delivery_time=this.finalDate_on;
           this.pincode=promise.pincode;
         
          }
        } 
       // alert(this.delivery_time) 
        ss.delivery_time=this.delivery_time;
});


});
console.log(this.mycartlist)
// Item delivery time cal End

         }
          else {
              Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Cart Is Empty, Please Add Product To Cart',
                  showConfirmButton: false,
                  timer: 3000
              })
          }
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Cart Is Empty, Please Add Product To Cart',
                showConfirmButton: false,
                timer: 3000
            })
            window.location.replace('/app/home')
        }
      });

  }

place_order () {
   var modeofpayment=  sessionStorage.getItem('paymentmode');
    this.mycartlist1 = [];
    this.mycartlist.forEach((_ss:any)=>
    {
        this.mycartlist1.push({  productid: _ss.productid, itemid: _ss.itemid,
                               quantity: _ss.quantity,totquantity: _ss.totquantity,
             selling_price: _ss.selling_price, mrp: _ss.mrp,delivery_time:_ss.delivery_time,
             gst_percentage:_ss.gst_percentage})

    })

    var total = 0;
    var totalqty=0;
    var gst_amount=0;
    for (var i = 0; i < this.mycartlist.length; i++) {
        var product = this.mycartlist[i];
        total += (product.selling_price * product.quantity);
        totalqty +=  (product.quantity);
        //gst_amount+=(product.gst_amount* product.quantity);
    }
    this.total = total;
    this.totalqty = totalqty;
    this.gstamount = gst_amount;
    this.payableamount = total;

    let url='';
    let url1='CartCheckPlaceOrder/check_item_available/';
    var data1={
        'ordercartlist': this.mycartlist1,
        "payable_amount":this.payableamount
    }
    this.allapi.PostData(url1,data1).subscribe(promise=>
        {
            if(promise.status=='Failed')
        {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: promise.ret_itemname+'Out Of Stack, Please Try Other',
              showConfirmButton: false,
              timer: 5000
          })
          window.location.replace('app/home');
          return
         }
if(modeofpayment=='Online')
{
     url='CartCheckPlaceOrder/CheckOut_online/';
}
else if(modeofpayment=='POD'){

     url='CartCheckPlaceOrder/CheckOut_POD/';
}

    var data = {
        'ordercartlist': this.mycartlist1,
        "shippingaddress_id": this.shippingaddress_id,
        "modeofpayment": this.modeofpayment,
        "delivery_charge":30,
        "discount_amount":100,
        "total_order_amount":total,
        "tax_amount":this.gstamount,
        //"gross_amount":total + this.gstamount + 30 + 100,
        "gross_amount":total,
        "payable_amount": this.payableamount,
    }

    console.log(data)
    this.allapi.PostData(url, data).subscribe(promise=> {
        if(promise.status=='Failed')
        {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: promise.ret_itemname+'Out Of Stack, Please Try Other',
              showConfirmButton: false,
              timer: 5000
          })
          window.location.replace('app/home');
          return
         }
        this.payment_orderid = promise.payment_orderid;
        this.orderid = promise.order_id;
        this.customername5 = promise.customer_name;
        sessionStorage.setItem('name',promise.customer_name);
        this.emailid5 = promise.email;
        this.mob5 = promise.mobile;
        if(modeofpayment=='Online')
        {
            this.razorpay(this.payment_orderid);

        }
        else if(modeofpayment=='POD')
        {
            if (promise.status_flg == true) {
                window.location.replace("/app/cart/orderconfirm");

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
        }

    });

});
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
    var total = 0;
    var gst_amount=0;
    var totalqty=0;
    for (var i = 0; i < this.mycartlist1.length; i++) {
        var product = this.mycartlist1[i];
        total += (product.selling_price * product.quantity);
        totalqty +=  (product.quantity);
        //gst_amount+=(product.gst_amount* product.quantity);
    }
    this.total = total;
    this.totalqty = totalqty;
    this.gstamount = gst_amount;
    this.payableamount = total;


   let url='CartCheckPlaceOrder/paymentsave/';
   var data = {
       "payment_transaction_id": event.detail.razorpay_payment_id,
       "payment_order_id": event.detail.razorpay_order_id,
       'ordercartlist': this.mycartlist1,
       "delivery_charge":30,
        "discount_amount":100,
        "total_order_amount":total,
        "tax_amount":this.gstamount,
        //"gross_amount":total + this.gstamount + 30 + 100,
        "gross_amount":total,
        "payable_amount": this.payableamount,

       };
   this.allapi.PostData(url,data).subscribe(promise=>
       {
           if (promise.status_flg == true) {
               window.location.replace("/app/cart/orderconfirm");

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


// Route Calculation
next(arr: any) {
    arr.forEach((node: any, index: any) => {
      if (index <= arr.length - 2) {
        let hub1 = node;
        let hub2 = arr[index + 1];
        let t = this.graph.getEdgeAttributes(hub1, hub2);
        this.graph.dropDirectedEdge(hub1, hub2);
        let _newGraph = dijkstra.bidirectional(
          this.graph,
          this.starts,
          this.ends
        );
        if (_newGraph) {
          let str = _newGraph.join('');
          if (this.all_str.indexOf(str) === -1) {
            this.all.push(_newGraph);
            this.all_str.push(str);
          }
        }
        this.graph.addDirectedEdge(hub1, hub2, t);
      }
    });
  }
  
  getleastHour(arr: any) {
    let new_tloop = arr.sort(function (a: any, b: any) {
      return a - b;
    });
    return new_tloop[0];
  }
  getWindow(arr: any, nd: any) {
    // arr array of window timing , nd new DateTime to start checking window
  
    let r: any;
    this.tempArr.push(nd);
  
    arr.forEach((avail: any) => {
      let _avail = avail.split(':');
      let tempND = new Date(
        nd.getFullYear(),
        nd.getMonth(),
        nd.getDate(),
        _avail[0],
        _avail[1],
        _avail[2]
      );
      this.tempArr.push(tempND);
    });
    this.tempArr = this.tempArr.sort();
    if (this.tempArr.length - 1 == this.tempArr.indexOf(nd)) {
      let t = new Date(this.tempArr[0]);
      t.setDate(this.tempArr[0].getDate() + 1);
      this.tempArr[0] = new Date(t);
      r = new Date(this.tempArr[0]);
    } else {
      r = new Date(this.tempArr[this.tempArr.indexOf(nd) + 1]);
    }
    this.tempArr = [];
  
    
  
    return r;
  }
  
    leastVal(arr: any) {
      let t: any;
      arr.forEach((a: any, b: any) => {
        if (b < arr.length - 1) {
          if (a < arr[b + 1]) {
            t = a;
          } else {
            t = arr[b + 1];
          }
        }
      });
  
      return t;
    }



}







