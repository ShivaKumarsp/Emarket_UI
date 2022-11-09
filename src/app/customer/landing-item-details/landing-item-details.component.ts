import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { LoginHomeComponent } from 'src/app/home/login-home/login-home.component';
import { CartService } from 'src/app/AllPageService/CartService/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var window: any;
import Graph from 'graphology';
import { dijkstra, edgePathFromNodePath } from 'graphology-shortest-path';
import { date } from '@rxweb/reactive-form-validators';


export interface Employee {
  id: number,
  firstName: string,
  lastName: string,
  department: number,
  address: string,
  contactNumber: string
}

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  transform(value: Array<any>, field: string): Array<any> {
    const groupedObj = value.reduce((prev, cur)=> {
      (prev[cur[field]] = prev[cur[field]] || []).push(cur);
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }
}

@Component({
  selector: 'app-landing-item-details',
  templateUrl: './landing-item-details.component.html',
  styleUrls: ['./landing-item-details.component.css']
})

export class LandingItemDetailsComponent implements OnInit {
  router: any;
  constructor(private allapi:AllapiService,
    private activateroute:ActivatedRoute,
    private header:HeaderComponent,
    private loginmodel:LoginHomeComponent,
    private cartservice:CartService,
    private spinner:NgxSpinnerService
   ) { }

   ss="";

public cartcount=0;
public featurelist:any;
all_variant_attr_list:any;
public all_variant_attr_list_new:any;
public single_variant_attr:any;
public attributevalue="";
public itm_id=0;
public item_list:any;
public specification_list:any;
imagepath:any;
public gen="";
formModel:any;
public usrnme="";
 public test="";
 public userName="";
 public password="";
 public rememberMe="";
  roleid =0;
 templateformdata = {
  "UserName": "",
  "Password": "",
  "role": ""
  }
  check_session={
    userid:0,
    roleid:0,
  }
  public register = false;
  public otp = false;
  public login = true;
  public forget = false;
  public details = false;
  public role="";
  login_dto: any;
  module_list: any;
  page_list: any;
  templatesList: any;
  spe_details:any;
  edittemplatesList:any;
  det="";

  public rdata: any;
  public feature: any;
  specification:any;
  public listData: any;
  public groupBy:any;
  item:any;
  similar_item_list:any;
  item_delivery_date:any;
  all_product_variant_one:any;
  all_product_variant_two:any;
  all_product_variant_two1:any;
  multiple_image_list:any;
  rating_list:any;
  base64="data:image/jpeg;base64,";
  imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  all_product_variant_one_new:any[] | undefined = undefined;
  all_product_variant_two_new:any[] | undefined = undefined;
  variant_name1="";
  variant_name2="";
  salt="";
  salt_token="";
  totalrating=0;
  delivery_time="";
  pincode="";


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
 source_dest_datetime:any;
  // route cal end

  public objectValues(obj:any) {
  
    return Object.values(obj);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navText: ['', ''],
    navSpeed:700,
    responsive: {0:{items: 1 }},
    nav: true
  }
  



ngOnInit(): void {

 let expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 18));

  window.scrollTo(0,0);

//let item=sessionStorage.getItem('itemid');
this.item=this.activateroute.snapshot.paramMap.get("itemid");

  var data = {
    "language_id": 1,
    "item_id": parseInt(this.item),
   
  }
 
    let requestFormUrl='Landing_Item_Details/get_data/';
    this.allapi.PostData_userid(requestFormUrl,data).subscribe(response => {  
      // route Cal 
      this.hub_list_1 = JSON.parse(response.hub_list_1).Table;
      this.hub_list_2 = JSON.parse(response.hub_list_2).Table;    
      this.hub_route_list = JSON.parse(response.hub_route_list).Table;
     // route Cal  end

      this.item_delivery_date=response.item_delivery_date;
      // if(this.item_delivery_date!=null &&  this.item_delivery_date!="")
      // {
      //  this.delivery_time=this.item_delivery_date[0].delivery_date;
      //  this.pincode=response.pincode;
      // }
      this.similar_item_list=JSON.parse(response.similar_item_list).Table;
      this.specification_list = response.specification_list;
      this.multiple_image_list = response.multiple_image_list;
      this.rating_list = response.rating_list;
      var rating=0;
      var totalrating=0;
      if(this.rating_list!="")
      {       
        this.rating_list.forEach((ss:any)=>
        {
          rating=rating+ss.rating_number;
        })
       
        totalrating=(rating*5)/(this.rating_list.length*5);
        //totalrating=(rating/(this.rating_list.length*5))*100;
      }
      this.totalrating=totalrating;
      if(response.featurelist!=="" || response.featurelist!==null)
      {
        this.featurelist = response.featurelist;
      }      
      this.all_variant_attr_list = response.all_variant_attr_list;

let aa= this.groupBy = (array:any, key:any) => { 

  return array.reduce((result:any, currentValue:any) => {

    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

this.rdata= aa(this.all_variant_attr_list, 'attributename');

this.all_variant_attr_list = this.groupBy3(response.all_variant_attr_list, "attributename");
this.edittemplatesList=this.all_variant_attr_list  
      this.all_variant_attr_list_new = response.all_variant_attr_list;
      this.single_variant_attr = response.single_variant_attr;

      if (this.single_variant_attr != null && this.single_variant_attr != "") {
        this.attributevalue = this.single_variant_attr[0].attributevalue;
        this.itm_id = this.single_variant_attr[0].itemid;
       
      }     
      this.spe_details = [];
      console.log(this.specification_list)
      var spec=this.specification_list[0].specificationname;

      if (response.item_list != "") {
          this.item_list = response.item_list[0]; 
          this.imagepath= this.item_list.imagepath;      
          this.specification= aa(this.specification_list, 'specificationname');
        
          this.gen = 'active';   
          var i_id=this.item_list.itemid; 
         
       
          
        

        }
        this.specification_list.forEach((aa:any) => {
          if (spec == aa.specificationname) {
          this.spe_details.push(aa);
          }
      });

    //   this.all_product_variant_one=response.all_product_variant_one; 
    //   this.all_product_variant_two=response.all_product_variant_two;
    //   var attrid=0;
    //   this.all_product_variant_one.forEach((ss:any)=>
    //   {
    //  if(attrid==0)
    // {
    // attrid=ss.attribute_value_id;
    // }
    //   });

    //   this.all_product_variant_two1=[];
    //   this.all_product_variant_two.forEach((ss1:any)=>
    //   {
    //     if(attrid==ss1.attribute_value_id)
    //     {
    //     this.all_product_variant_two1.push(ss1);
    //     }
    //   });

    //   this.all_product_variant_one_new = this.groupBy3(this.all_product_variant_one, "attributename");
    //   this.all_product_variant_two_new = this.groupBy3(this.all_product_variant_two1, "attributename");

    });
  }

  check_pincode_test(ss:any)
  {
var data={
  "pincode":parseInt(ss),
  "item_id": parseInt(this.item),
  "language_id":1,
}
let url='Landing_Item_Details/get_delivery_date/';
this.allapi.PostData_login(url,data).subscribe(promise=>
  {
    this.delivery_time="";
    this.item_delivery_date=promise.item_delivery_date;

    if(promise.check_delivery==0)
    {

    if(this.item_delivery_date!=null &&  this.item_delivery_date!="")
    {
     this.delivery_time=this.item_delivery_date[0].delivery_date;
     this.pincode=promise.pincode;
    }
    else
    {
      this.delivery_time=promise.delivery_date;
     this.pincode=promise.pincode;
    }
  }
    else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Delivery Not Available In This Location',
        showConfirmButton: false,
        timer: 3000
    });
    this.delivery_time="";
    this.pincode="";
    }
  })


  }

  hub_route_list12:any;
  check_pincode(ss:any)
  {
    var myroute = '';
 
    this.starts = '';
    this.ends = '';
    var data={
      "pincode":parseInt(ss),
      "item_id": parseInt(this.item),
      "language_id":1,
    
    }
    let url='Landing_Item_Details/get_hub_id/';
    this.allapi.PostData_login(url,data).subscribe(promise=>
      {   
        this.hub_route_list12=[]; 
        this.hub_list_1 = JSON.parse(promise.hub_list_1).Table;
        this.hub_list_2 = JSON.parse(promise.hub_list_2).Table; 
        this.source_dest_datetime=promise.source_dest_datetime; 
        this.hub_route_list=JSON.parse(promise.hub_route_list).Table; 
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
        console.log(this.graph)
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
        let d:any;
        if(this.source_dest_datetime!=""|| this.source_dest_datetime!=null)
        { 
              
          d = new Date(this.source_dest_datetime[0].source_date);
             
        }
        else{
          d = new Date();
        }
     
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
            
            console.log(d)

           
            tempArr.push(WindowTime);
          }
        });
        let routeCode = route.join().replaceAll(',', '');
        windows[routeCode] = tempArr;

        this.finallyReachDateTime.push(d);
        this.finallyReachRoute.push(route);
        

      });
      let _finalReachTime = this.leastVal(this.finallyReachDateTime);
      let finalDateTime =this.finallyReachDateTime[this.finallyReachDateTime.indexOf(_finalReachTime)];
       let finalRoute =this.finallyReachRoute[this.finallyReachDateTime.indexOf(_finalReachTime)];

     
      let finalwindows = windows[finalRoute.join().replaceAll(',', '')];
     
      this.finalDate_on=finalDateTime;
      //let expiryDate = new Date(new Date().setHours(new Date().getHours() + 4));
 
      myroute = finalRoute.toString();
      console.log('Selected Route',finalRoute)
      console.log('windows',windows)
      console.log('Reaching on ',finalDateTime)
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






var data={
  "pincode":parseInt(ss),
  "item_id": parseInt(this.item),
  "language_id":1,
  "hub_route": myroute,
  "hubarray": this.allhub_max,
}
let url='Landing_Item_Details/get_delivery_date/';
this.allapi.PostData_login(url,data).subscribe(promise=>
  {
    this.delivery_time="";
    this.item_delivery_date=promise.item_delivery_date;
 
    if(promise.check_delivery==0)
    {

    if(this.item_delivery_date!=null &&  this.item_delivery_date!="")
    {
     this.delivery_time=this.item_delivery_date[0].delivery_date;
     this.pincode=promise.pincode;
    }
    else
    {   
      var _date =this.finalDate_on;
     //var _date_new= _date.setDate( _date.getDate() + 2 );

     // this.delivery_time=promise.delivery_date;
     this.delivery_time=this.finalDate_on;
     this.pincode=promise.pincode;
    }
  

    var data1={
      "pincode":parseInt(ss),
      "item_id": parseInt(this.item),
      "language_id":1,
       "delivery_date_new":this.delivery_time
    }
    let url1='Landing_Item_Details/get_finale_delivery_date/';

    this.allapi.PostData(url1,data1).subscribe(promise=>
      {
        this.delivery_time=promise.item_final_delivery_date[0].delivery_time;
      })

  }

    else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Delivery Not Available In This Location',
        showConfirmButton: false,
        timer: 3000
    });
    this.delivery_time="";
    this.pincode="";
    }
  })

});
  }
  
  get_item_details(ss:any)
  {
    var data = {
      "language_id": 1,
      "item_id": parseInt(ss),
     
    }
  
      let requestFormUrl='Landing_Item_Details/get_data/';
      this.allapi.PostData(requestFormUrl,data).subscribe(response => {   
        this.similar_item_list=JSON.parse(response.similar_item_list).Table;
        this.specification_list = response.specification_list;
        this.all_product_variant_one=response.all_product_variant_one; 
        this.rating_list = response.rating_list;
        this.all_product_variant_two=response.all_product_variant_two;
        // if(response.cartlist!=="" || response.cartlist!==null)
        // {
        //   this.cartcount = response.cartlist.length;
        // }
        if(response.featurelist!=="" || response.featurelist!==null)
        {
          this.featurelist = response.featurelist;
        }      
        this.all_variant_attr_list = response.all_variant_attr_list;
        this.multiple_image_list = response.multiple_image_list;

  let aa= this.groupBy = (array:any, key:any) => {
  
    return array.reduce((result:any, currentValue:any) => {
  
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  
  this.rdata= aa(this.all_variant_attr_list, 'attributename');
 
  this.all_variant_attr_list = this.groupBy3(response.all_variant_attr_list, "attributename");
  this.edittemplatesList=this.all_variant_attr_list
      
       
  
        this.all_variant_attr_list_new = response.all_variant_attr_list;
        this.single_variant_attr = response.single_variant_attr;
  
        if (this.single_variant_attr != null && this.single_variant_attr != "") {
          this.attributevalue = this.single_variant_attr[0].attributevalue;
          this.itm_id = this.single_variant_attr[0].itemid;
        }     
        this.spe_details = [];
       
        var spec=this.specification_list[0].specificationname;
  
        if (response.item_list != "") {
            this.item_list = response.item_list[0];   
            this.imagepath= this.item_list.imagepath;           
            this.specification= aa(this.specification_list, 'specificationname');
            this.gen = 'active';        
          }
          this.specification_list.forEach((aa:any) => {
            if (spec == aa.specificationname) {
            this.spe_details.push(aa);
            }
        });    
  
  
      });
      window.scrollTo(0,0);
  }

  change_relatedvalue(ss:any) {
  
     var data = {
       "language_id": 1,
       "item_id": parseInt(ss.itemid)      
     }
   
       let requestFormUrl='Landing_Item_Details/get_data/';
       this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {   
        this.similar_item_list=JSON.parse(response.similar_item_list).Table;
        this.specification_list = response.specification_list;
        this.all_product_variant_one=response.all_product_variant_one; 
        this.rating_list = response.rating_list;
        this.all_product_variant_two=response.all_product_variant_two;
        // if(response.cartlist!=="" || response.cartlist!==null)
        // {
        //   this.cartcount = response.cartlist.length;
        // }
        if(response.featurelist!=="" || response.featurelist!==null)
        {
          this.featurelist = response.featurelist;
        }      
        this.all_variant_attr_list = response.all_variant_attr_list;
        this.multiple_image_list = response.multiple_image_list;
  
  let aa= this.groupBy = (array:any, key:any) => {
  
    return array.reduce((result:any, currentValue:any) => {
  
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  
  this.rdata= aa(this.all_variant_attr_list, 'attributename');
  //this.feature= aa(this.featurelist, 'producttitle');
  
  this.all_variant_attr_list = this.groupBy3(response.all_variant_attr_list, "attributename");
  this.edittemplatesList=this.all_variant_attr_list
      
       
  
        this.all_variant_attr_list_new = response.all_variant_attr_list;
        this.single_variant_attr = response.single_variant_attr;
  
        if (this.single_variant_attr != null && this.single_variant_attr != "") {
          this.attributevalue = this.single_variant_attr[0].attributevalue;
          this.itm_id = this.single_variant_attr[0].itemid;
        }     
        this.spe_details = [];
       
        var spec=this.specification_list[0].specificationname;
  
        if (response.item_list != "") {
            this.item_list = response.item_list[0];   
            this.imagepath= this.item_list.imagepath;           
            this.specification= aa(this.specification_list, 'specificationname');
            this.gen = 'active';        
          }
          this.specification_list.forEach((aa:any) => {
            if (spec == aa.specificationname) {
            this.spe_details.push(aa);
            }
        });
  
  
      });

  }

get_specification_details (ss:any) {
  
  this.spe_details = [];
   
    this.specification_list.forEach((aa:any) => {
      if (ss == aa.specificationname) {
      this.spe_details.push(aa);
      }
  });
 
  
}

change_image_slide(ss:any)
{

  this.imagepath=ss;

}
change_image(ss:any)
{
  this.imagepath=ss.image_url;

}

add_to_cart_old(_ss:any)
{
  let userid=Number(localStorage.getItem('userid'));
  if(userid==0)
  {  
    let url='Account/set_salt/';
    this.allapi.GetDataById_login(url,1).subscribe(response=>
    {
      let salt=response.entity.salt;
      let salt_token=response.entity.salt_token;
      let userrole="Customer";
      this.header.click_login_from_landing(userrole,salt,salt_token);   
    })
  }   
  else{
    var data = {
      "product_id": _ss.productid,
      "item_id": _ss.itemid      
  }
  
    let requestFormUrl = 'Landing_Item_Details/add_to_cart/';
    this.allapi.PostData_userid(requestFormUrl,data).subscribe(response => {
      if(response.msg_flg=='Failed')
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: response.message,
          showConfirmButton: false,
          timer: 3000
      });
      }
      else  if(response.msg_flg=='Insert')
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 3000
      });
      window.location.reload();
      }
 });
  }  
  }

  add_to_cart(_ss:any)
  {
    let userid=Number(localStorage.getItem('userid'));
    if(userid==0)
    {  

    }   
    else{
     
    }    
    var data = {
      "product_id": _ss.productid,
      "item_id": _ss.itemid,
      "session_cart":localStorage.getItem('v_cart')  
    }
      let requestFormUrl = 'Landing_Item_Details/add_to_cart/';
      this.allapi.PostData_userid(requestFormUrl,data).subscribe(response => {
        if(response.msg_flg=='Failed')
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: response.message,
            showConfirmButton: false,
            timer: 3000
        });
        }
        else  if(response.msg_flg=='Insert')
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 3000
        });
        //this.cartservice.addtoCart(response.cartlist.length)
        //this.header.cartcount=response.cartlist.length;
        window.location.reload();
        }
        
      
        
   });
    }  
    
    add_wish_list(_ss:any)
    {
      let userid=Number(localStorage.getItem('userid'));
         
      var data = {
        "product_id": _ss.productid,
        "item_id": _ss.itemid,
       
      }
        let requestFormUrl = 'Landing_Item_Details/add_to_wish_list/';
        this.allapi.PostData_userid(requestFormUrl,data).subscribe(response => {
          if(response.msg_flg=='Failed')
          {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: response.message,
              showConfirmButton: false,
              timer: 3000
          });
          }
          else  if(response.msg_flg=='Insert')
          {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 3000
          });
          //this.cartservice.addtoCart(response.cartlist.length)
          //this.header.cartcount=response.cartlist.length;
          window.location.reload();
          }
          
        
          
     });
      }  
  
    single_checkout_old(_ss:any)
    {

      let userid=Number(localStorage.getItem('userid'));
      if(userid==0)
      {  
        let url='Account/set_salt/';
        this.allapi.GetDataById_login(url,1).subscribe(response=>
        {
          let salt=response.entity.salt;
          let salt_token=response.entity.salt_token;
          let userrole="Customer";
          this.header.click_login_from_landing(userrole,salt,salt_token);     
          //
        })
  
      }   
      else{
        this.spinner.show();
        var data = {
          "product_id": _ss.productid,
          "item_id": _ss.itemid      
      }
      let url='Landing_Item_Details/single_checkout/';
      this.allapi.PostData(url, data).subscribe(promise=>
        {
if(promise.msg_flg=='Insert')
{ 
  // this.router.navigate(["/app/direct_cart"]);
  window.location.replace('app/direct_cart');
  this.spinner.hide();
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
      this.spinner.hide();
      }

      single_checkout(_ss:any)
      {
     
        let userid=Number(localStorage.getItem('userid'));
               if(userid==0)
        {  
          var data = {
            "product_id": _ss.productid,
            "item_id": _ss.itemid,
            "session_cart":localStorage.getItem('v_cart')  
          }
            let requestFormUrl = 'Landing_Item_Details/single_public_checkout/';
            this.allapi.PostData_userid(requestFormUrl,data).subscribe(response => {
              if(response.msg_flg=='Failed')
              {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: response.message,
                  showConfirmButton: false,
                  timer: 3000
              });
              }
              else if(response.msg_flg=='Insert')
              {
                window.location.replace('/app/public_direct_cart')           
              }                
         });
        }   
        else{
          var data1 = {
            "product_id": _ss.productid,
            "item_id": _ss.itemid
          }
            let requestFormUrl1 = 'Landing_Item_Details/single_checkout/';
            this.allapi.PostData_userid(requestFormUrl1,data1).subscribe(response => {
              if(response.msg_flg=='Failed')
              {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: response.message,
                  showConfirmButton: false,
                  timer: 3000
              });
              }
              else if(response.msg_flg=='Insert')
              {
                window.location.replace('/app/direct_cart')
           
              }
              
            
              
         });
        }    
       
        } 

    userLogin = () => {   
  
      this.templateformdata.UserName = this.userName;
      this.templateformdata.Password = this.password;  
      this.templateformdata.role ='Customer';  
      // this.templateformdata.role = String(sessionStorage.getItem('rolename'));  
      let requestFormUrl = 'Account/login';
         this.allapi.PostData(requestFormUrl,this.templateformdata).subscribe(response => {
         if (response.code == 200) { 
               //sessionStorage.setItem('userName', response.entity.username);
               sessionStorage.setItem('idToken', response.entity.token); 
          sessionStorage.setItem('log_id', response.entity.log_id); 
          sessionStorage.setItem('roleid', response.entity.roleid);
          sessionStorage.setItem('userid', response.entity.userId);
          sessionStorage.setItem('setUser', JSON.stringify(response.entity));
          //this.authService.setSecureToken(response.entity.token);
  
         
            this.role = response.entity.role;
            sessionStorage.setItem('role', this.role);
           // this.usrnme=response.username;
           this.formModel = new window.bootstrap.Modal(
            document.getElementById("LoginModal")         
          );    
          this.formModel.hide(); 
         
            let requestFormUrl = 'Account/getmodule/';
            let roleid= Number(sessionStorage.getItem('roleid'));
          let userid=Number(sessionStorage.getItem('userid'));
          this.check_session.roleid=roleid;
           this.check_session.userid=userid;
             this.allapi.PostData(requestFormUrl,this.check_session).subscribe(response => {
            
            this.module_list = response.getmodulelist;
            this.page_list = response.getpagelist;
            this.cartcount = response.cartlist.length;
            window.location.replace("home/ItemDetails");
        })           
       
    
           
        }
         else {
         // this.spinner.hide();
          //this.toastr.errorToaser(response.error);
        }
      });
    }
  
    backtomain()
    {
      window.location.replace("/app/home");
    }
 
  
  groupBy5 = (xs: any[], key: string) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
  }

  groupBy3(list: any[], property: string | number) {
    return list.reduce((groups, item) => {
        const val = item[property];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
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
function dateAdd(arg0: string, arg1: number, arg2: any) {
  throw new Error('Function not implemented.');
}

