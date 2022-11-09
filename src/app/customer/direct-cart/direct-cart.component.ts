import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { DataService } from 'src/app/dataservice/data.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-direct-cart',
  templateUrl: './direct-cart.component.html',
  styleUrls: ['./direct-cart.component.css']
})
export class DirectCartComponent implements OnInit {

  constructor(private httpClient: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private authService:AuthService,
   public all_data: DataService,
   private spinner:NgxSpinnerService
  
  ) { }
   mycartlist:any;
   mycartlist1:any;
   public total:any;
   public gstamount:any;
   public payableamount:any;
   public cartcount:any;
   shipingamount:any;
   discount:any;
   message123:any;
   hub_list:any;
   hub_route_list:any;

  

firsthub:any;
lasthub:any;
finalHour:any=0
finalRoute:any
allNodes:any
allConnection:any
item_variant:any;

base64='data:image/jpeg;base64,';
imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  ngOnInit(): void {

    let url='Shopping_Cart/single_checkout/';
    var data={
      "language_id":1
    }
    this.allapi.PostData(url,data).subscribe(response=>
      {
        this.hub_list=JSON.parse(response.hub_list).Table;
          this.hub_route_list=JSON.parse(response.hub_route_list).Table;
          this.item_variant=response.item_variant;
        this.mycartlist1=response.mycartlist;
        if (response.mycartlist != "") {
          this.mycartlist = [];
          this.mycartlist1 = response.mycartlist;
          
          this.mycartlist1.forEach((ss:any) => {
             this.mycartlist.push({ productname: ss.productname, productid: ss.productid, selling_price: ss.selling_price,
               mrp: ss.mrp, itemid: ss.itemid, imagename: ss.imagename, imageurl: ss.imageurl,
                totquantity: ss.totquantity,  quantity: 1, 
                gst_percentage:ss.gst_percentage, gst_amount:ss.gst_amount })
            });       
          
var ss=this.mycartlist;          

          var total = 0;
          var gst_amount=0;
          for (var i = 0; i < this.mycartlist.length; i++) {
              var product = this.mycartlist[i];
              total += (product.selling_price * product.quantity);
              //gst_amount+=(product.gst_amount* product.quantity);
          }
          this.total = total;
         // this.gstamount = gst_amount;
    this.payableamount = total;
   
  //  this.payableamount = total + this.gstamount + 30 - 100; 
          this.cartcount = response.mycartlist.length;
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

      })
  }

  increase_quantity (aa:any) {
    this.mycartlist1 = [];
    var total = 0;
    var gst_amount=0;
    this.mycartlist.forEach((_element: any) => {
      if (_element.itemid == aa.itemid && _element.quantity < aa.totquantity) {
        this.mycartlist1.push({ productname: _element.productname, productid: _element.productid, 
          selling_price: _element.selling_price, mrp: _element.mrp, quantity: _element.quantity + 1,
           itemid: _element.itemid, imagename: _element.imagename, imageurl: _element.imageurl,
            totquantity: _element.totquantity, 
            gst_percentage:_element.gst_percentage, gst_amount:_element.gst_amount })
    }
    else {
      this.mycartlist1.push({ productname: _element.productname, productid: _element.productid, 
          selling_price: _element.selling_price, mrp: _element.mrp, quantity: _element.quantity,
          itemid: _element.itemid, imagename: _element.imagename, imageurl: _element.imageurl,
           totquantity: _element.totquantity, gst_percentage:_element.gst_percentage, gst_amount:_element.gst_amount })
    }
 });
    
    
 this.mycartlist = this.mycartlist1;
    for (var i = 0; i < this.mycartlist.length; i++) {
        var product = this.mycartlist[i];
        total += (product.selling_price * product.quantity);
        //gst_amount+=(product.gst_amount* product.quantity);
    }
    this.total = total;
    //this.gstamount = gst_amount;
    this.payableamount = total;
}
decrease_quantity (aa:any) {
  this.mycartlist1 = [];
    var total = 0;
    var gst_amount = 0;
    this.mycartlist.forEach((_ss:any) => {
      if (_ss.itemid == aa.itemid && aa.quantity > 1) {
        this.mycartlist1.push({ productname: _ss.productname, productid: _ss.productid, selling_price: _ss.selling_price, mrp: _ss.mrp, 
          quantity: _ss.quantity - 1, itemid: _ss.itemid, imagename: _ss.imagename, imageurl: _ss.imageurl, 
          totquantity: _ss.totquantity, gst_percentage:_ss.gst_percentage, gst_amount:_ss.gst_amount })
    }
    else {
        this.mycartlist1.push({ productname: _ss.productname, productid: _ss.productid, selling_price: _ss.selling_price, mrp: _ss.mrp,
           quantity: _ss.quantity, itemid: _ss.itemid, imagename: _ss.imagename, imageurl: _ss.imageurl,
            totquantity: _ss.totquantity,gst_percentage:_ss.gst_percentage, gst_amount:_ss.gst_amount })
    }
    });
  
    this.mycartlist = this.mycartlist1;

    for (var i = 0; i < this.mycartlist.length; i++) {
        var product = this.mycartlist[i];
        total += (product.selling_price * product.quantity);
        //gst_amount+=(product.gst_amount* product.quantity);
    }
    this.total = total;
    //this.gstamount = gst_amount;
    this.payableamount = total;
  
}



goto_address()
{
  let mycartlist_json = JSON.stringify(this.mycartlist);  

  let url='Shopping_Cart/single_checkout_qty_update/';
  var data={
    "language_id":1,
    "quantity":this.mycartlist[0].quantity
  }
  this.allapi.PostData(url,data).subscribe(response=>
    { 
      if(response.msg_flg=='Insert')
{
  window.location.replace("/app/direct_cart_address");
}
else 
{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Failed To Add Try Again',
    showConfirmButton: false,
    timer: 3000
});
}

    

    })


  
          
}
//=====================
 RemoveElementFromObjectArray(key: number) {
  this.mycartlist.forEach((value: { itemid: any; },index: any)=>{
      if(value.itemid==key) this.mycartlist.splice(index,1);
  });
}

}

