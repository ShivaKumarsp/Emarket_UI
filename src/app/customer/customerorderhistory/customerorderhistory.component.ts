import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
declare var window: any;


@Component({
  selector: 'app-customerorderhistory',
  templateUrl: './customerorderhistory.component.html',
  styleUrls: ['./customerorderhistory.component.css']
})
export class CustomerorderhistoryComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;


  public listData: any;
  constructor( private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private authService:AuthService) { }
   customer_order_list:any;
   customer_name="";
   customerlist:any;
   genderlist:any;
   countrylist:any;
   first_name="";
   second_name="";
   email="";
   mobile="";
   address="";
   city="";
   countryid="";
   stateid="";
   pincode="";
   dob=0;
   dob1="";
   alternative_mobile="";
   genderid="";
   statelist:any;
   new_pass="";
   retype_pass="";
   old_pass="";
   valueAsDate="";
   p_imageurl="";
   base64='data:image/jpeg;base64,';
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
   userProfileImage:String="https://cdn-icons-png.flaticon.com/512/149/149071.png";
   
  ngOnInit(): void {
 
var data={
  "language_id":1,
  "page":this.page-1,
  "limit":this.tableSize
}
    let requestFormUrl = 'Customer_Order_Track/get_data/';
    this.allapi.GetDataById(requestFormUrl,1).subscribe(promise => {
   if(promise.customer_order_list!="")
   {
    this.customer_order_list=promise.customer_order_list;
    this.customer_name=promise.customer_name;
   }
   if (promise.customerlist != "") {

    this.customerlist = JSON.parse(promise.customerlist).Table;
    this.p_imageurl=this.customerlist[0].imageurl;
    this.first_name =this.customerlist[0].cfirst_name;
    this.second_name =this.customerlist[0].csecond_name;

             if(this.p_imageurl!="" && this.p_imageurl!=null)
             {
              this.userProfileImage=this.p_imageurl
             }

 }

 });
   
  }
 
  
  show_item_details(ss:any)
  {
    sessionStorage.setItem('orderid',ss.orderid);
    //window.replace("/OrderHistory/CustomerOrderTrack");
    this.router.navigate(["/app/orderhistory/customerordertrack"]);
  }

  logout = () => {  
 
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("LoggedIn");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("roleid");
    let logid= sessionStorage.getItem('log_id');
    let requestFormUrl = 'Account/logout/';
       this.allapi.GetDataById(requestFormUrl,1).subscribe(response => {
       if (response.code == 200) {      
       

      }
       else {
       
       //this.spinner.hide();
       //this.toastr.errorToaser(response.error);
      }
    });
   
    this.router.navigate(["home"]);
   
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.page=this.page;
    this.ngOnInit();
  }
}
