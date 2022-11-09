import { Component, ElementRef, EventEmitter, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CryptoJS from 'crypto-js';
import { CartService } from 'src/app/AllPageService/CartService/cart.service';
import { Guid } from 'guid-typescript';
import { Subscription, take, timer } from 'rxjs';
declare var window: any;


@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // AES_Encrypt(ptext:any){
  //   return CryptoJS.AES.encrypt(ptext,this.salt).toString();
  // }

  AES_Decrypt(ptext:any){
    var bytes  = CryptoJS.AES.decrypt(ptext, this.salt);
    return  bytes.toString(CryptoJS.enc.Utf8);
  }

  Decrypt(ptext:any){
     let bytes= CryptoJS.AES.decrypt(ptext,this.salt);
     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      }

  Hashsha256withsalt(sha256pwd:string){
    let hash= (CryptoJS.HmacSHA256(sha256pwd,this.salt))
    return CryptoJS.enc.Base64.stringify(hash);
  }


  Hashsha256(sha256pwd:string){
    let hash= (CryptoJS.SHA256(sha256pwd))
           return CryptoJS.enc.Base64.stringify(hash);
  }

Encrypt(ptext:any){
    return CryptoJS.AES.encrypt(ptext,"1234567890987654").toString();
  }
  
  MD5_Convert(plaintext:string){
    let hash= (CryptoJS.MD5(plaintext))
    return CryptoJS.enc.Base64.stringify(hash);
  }
  
  
  

  constructor(
    private httpClient: HttpClient,
  private http: HttpClient,
 private router: Router,
 private allapi:AllapiService,
 private authService:AuthService,
 private spinner:NgxSpinnerService,
 private cartService : CartService,

  ) { 
    
  }
 
  public totalItem : number = 0;
  left:any;
  module_list: any;
  page_list: any;
  templatesList: any;
  cartcount:any;
  wishcount:any;
  page_list_new:any;
  hash_pwd="";
  rolid1:any;
  userid1:any;
  logid1:any;
page_redirect="";
isVisible: any=0;
salt="";
salt_token="";
formModel:any;
submitted=false;
pwdd:any;
homemenu=false;
public role="";
public v_role="";
role_v="";
public getrole="";
public role_get:any;
isvendor:any;
isvendorprofile:any;
login_dto: any;
public usrnme="";
public test="";
public uName="";
public pwd="";
public rememberMe="";
roleid =0;
otp=0;
otp_guid="";

public searchTerm !: string;
ipAddress="";
reg_otp:any;

r_pwdd:any;
username="";
slt1:any;
slttkn1:any;
rl:any;
category_list:any;
subcategory_list:any;
addcategory_list:any;
subcategory_list_new:any;
addcategory_list_new:any;
formModels:any
user_role="";
customerLogin = new UntypedFormGroup({
  name: new UntypedFormControl('', [Validators.required]),
  pass: new UntypedFormControl('',[Validators.required]),

});
timerOn = true;
v_cart:any;
guid:any;

countDown: any;
  counter = 0;
  tick = 0;
 
  

  
 
    ngOnInit(): void {

       this.cartService.getProducts()
      .subscribe(res=>{
      this.cartcount = res;
            })

     // this.spinner.show();
       if( Number(localStorage.getItem('roleid'))==0)
      {
        localStorage.setItem('Role',"Public");
        this.role_v="Public";
      }

      this.v_cart=localStorage.getItem('v_cart');
     if(this.v_cart==null && this.v_cart!="")
    {
      this.guid= Guid.create();
      localStorage.setItem('v_cart',this.guid);

    }

        let requestFormUrl = 'Account/getmodule/';
        var data={
          "roleid": Number(localStorage.getItem('roleid')),
          "userid":Number(localStorage.getItem('userid')),
          "session_cart":localStorage.getItem('v_cart')
        }
         this.allapi.PostData(requestFormUrl,data).subscribe(response => {
         if(response.role!=null)
         {
          this.role_v=response.role;
         }
        this.role=response.role;
        this.v_role=response.role;
       this.user_role=response.user_role;
             localStorage.setItem('rolename',response.role);
        localStorage.setItem('idToken', response.get_token);
        localStorage.setItem('isvendor', response.is_vendor_doc);
        localStorage.setItem('isvendorprofile', response.is_vendor_profile);
        this.module_list = response.getmodulelist;
        this.page_list = response.getpagelist;
        if(response.cartlist!="" && response.cartlist!=null)
        {
          this.cartcount = response.cartlist.length;
        }
        if(response.wishlist!="" && response.wishlist!=null)
        {
          this.wishcount = response.wishlist.length;
        }
        this.category_list=JSON.parse(response.category_list).Table;
        this.subcategory_list=JSON.parse(response.subcategory_list).Table;
        this.addcategory_list=JSON.parse(response.addcategory_list).Table;
    })
    //this.spinner.hide();
 
    }

    logout = () => {
      localStorage.removeItem('v_cart');
      let logid= localStorage.getItem('log_id');
      localStorage.clear();
       let requestFormUrl = 'Account/logout/';
         this.allapi.GetDataById(requestFormUrl,logid).subscribe(response => {
         if (response.code == 200) {

          localStorage.clear();
        }
         else {

         //this.spinner.hide();
         //this.toastr.errorToaser(response.error);
        }
      });

      localStorage.removeItem("idToken");
      localStorage.removeItem("LoggedIn");
      localStorage.removeItem("userid");
      localStorage.removeItem("roleid");

      window.location.reload();
      window.location.replace('');

    }
  redirect_home()
  {
    this.role_get=localStorage.getItem('rolename');
    this.isvendor=localStorage.getItem('isvendor');
    this.isvendorprofile=localStorage.getItem('isvendorprofile');

    if(this.role_get=="Customer")
        {

          window.location.replace('/app/home');
        }
        else if(this.role=="Vendor")
        {
          if(this.isvendor=="0" || this.isvendorprofile=="false")
          {
            window.location.replace("/app/vendordocuments");
          }
          else if(this.role=="Vendor" && this.isvendor=="1" || this.isvendorprofile=="true")
          {
            window.location.replace("/app/vendordashboard");
          }
        }
        else if(this.role_get=="SuperAdmin")
        {
          window.location.replace("/app/admindashboard");
        }
        else if(this.role=="Delivery"){

          window.location.replace('/app/vendor_to_facilitation');
         }
        else if(this.role=="Hub"){

          window.location.replace('/app/hub_consignment_list');
         }
         else if(this.role=="Facilitation"){

          window.location.replace('/app/assign_item_from_vendor');
         }
         else if(this.role=="Accountant"){

          window.location.replace('/app/account_dashboard');
         }
        else
        {
          window.location.replace("/app/home");
        }
  }
  get_page(ss:any)
  {
    this.page_list_new=[];
    this.page_list.forEach((aa:any) => {
      if(ss.mmid==aa.mmid)
      {
        this.page_list_new.push(aa);
      }
    });
  }
  get_subcategory(ss:any)
  {
    this.subcategory_list_new=[];
    this.subcategory_list.forEach((aa:any) => {
      if(ss.mcid==aa.mcid)
      {
        this.subcategory_list_new.push(aa);
      }
    });
  }

  get_addcategory(ss:any)
  {          sessionStorage.setItem('category_id', ss.mcid);
    window.location.replace("/app/landingcategory");
  }

    click_login(ss: any){
      this.submitted = false;
      this.customerLogin.reset();
      this.isVisible=0;
      this.customerLogin.reset();
        this.getrole=ss;
      localStorage.setItem('rol_name',ss.toString());
      let url='Account/set_salt/';
    this.allapi.GetDataById_login(url,1).subscribe(response=>
    {
      this.salt=response.entity.salt;
      this.salt_token=response.entity.salt_token;

    })
      this.formModel = new window.bootstrap.Modal(
        document.getElementById("loginModal")
      );
      this.formModel.show();
      this.role=ss.toString();
    }

    click_login_from_landing(ss:any,slt:any,salttoken:any){
      this.customerLogin.reset();

      this.isVisible=0;
 
      localStorage.setItem('slt',slt);
      localStorage.setItem('tkn',salttoken);
      localStorage.setItem('rol_name',ss.toString());
      //this.temp1='updated'
      this.formModel = new window.bootstrap.Modal(
        document.getElementById("loginModal_customer")
      );
      this.formModel.show();
      this.rl=localStorage.getItem('rol_name');
      this.role=this.rl;
      this.getrole=ss.toString();
      this.getrole=ss.toString();
   
     
    }




    showForm(ids:any){

      this.submitted = false;
      this.customerLogin.reset();

      this.login_otp.reset();


      this.customerregister = new UntypedFormGroup({
        r_username: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
        r_email: new UntypedFormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        r_phone: new UntypedFormControl('',[Validators.required]),
        r_pwd: new UntypedFormControl('',[Validators.required, Validators.minLength(8)]),
        r_repwd: new UntypedFormControl('',[Validators.required]),
        // r_username: new FormControl(''),
        // r_email: new FormControl(''),
        // r_phone: new FormControl(''),
        // r_pwd: new FormControl(''),
        // r_repwd: new FormControl('')
    });
   this.forgetotp=new UntypedFormGroup({
    f_username: new UntypedFormControl('')
   })
   this.loginwithotp=new UntypedFormGroup({
    otp_username: new UntypedFormControl('')
   })

      this.isVisible = ids;
    }

    userLoginProcess(){
         this.spinner.show();
      this.submitted = true;
      if (this.customerLogin.invalid) {
        return;
      }

      this.rl=localStorage.getItem('rol_name');
      this.role=this.rl;
      console.log('userloginprocess',this.role)
    if(this.salt==""||this.salt==undefined)
    {

      this.slt1=localStorage.getItem('slt');
      this.salt=this.slt1;
    }
    if(this.salt_token==""||this.salt_token==undefined)
    {

      this.slttkn1=localStorage.getItem('tkn');
      this.salt_token=this.slttkn1;
    }


      this.pwdd= this.MD5_Convert(this.customerLogin.value.pass);
      let hash= this.MD5_Convert(this.pwdd.toString()+this.salt);
      this.customerLogin.patchValue({
        pass: this.pwdd
        });

        localStorage.setItem('username',this.customerLogin.value.name);
      var data={
        "UserName":this.customerLogin.value.name,
        "Password":hash.toString(),
         "role":localStorage.getItem('rol_name'),
        "salt_token":this.salt_token,
        "ipAddress":this.ipAddress,
        "apitype":"Web",
        "session_cart":localStorage.getItem('v_cart')

      }
      let requestFormUrl = 'Account/login';
         this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {
         if (response.code == 200) {
          localStorage.removeItem('v_salt');
          localStorage.removeItem('v_salt_token');
          localStorage.setItem('idToken', response.entity.token);
          localStorage.setItem('log_id', response.entity.log_id);
          localStorage.setItem('roleid', response.entity.roleid);

          localStorage.setItem('userid', response.entity.userId);
          localStorage.setItem('isvendor',response.entity.is_vendor_doc);
          localStorage.setItem('isvendorprofile', response.entity.is_vendor_profile);

          this.authService.setSecureToken(response.entity.token);
          this.authService.setSecureRole(response.entity.role);
                     this.role = response.entity.role;
            this.role_v = response.entity.role;
            localStorage.setItem('rolename',response.entity.role);

              this.formModel = new window.bootstrap.Modal(
            document.getElementById("loginModal")

          );


          localStorage.removeItem('v_cart');
          this.isvendor=localStorage.getItem('isvendor');
          this.isvendorprofile=localStorage.getItem('isvendorprofile');

          this.formModel.hide();
          if(this.role=="Customer")
          {
           let redirectpage= localStorage.getItem('redirect_page');
              if(redirectpage!=null)
           {
            window.location.replace(redirectpage);
           }
           else{
            window.location.replace('/app/home');
           }

          }

          else if(this.role=="Vendor")
          {
            if(this.isvendor=="0" || this.isvendorprofile=="false")
            {
              window.location.replace("/app/vendordocuments");
            }
            else if(this.role=="Vendor" && this.isvendor=="1" || this.isvendorprofile=="true")
            {
              window.location.replace("/app/vendordashboard");
            }
          }

         else if(this.role=="SuperAdmin"){

          window.location.replace('/app/admindashboard');
         }
         else if(this.role=="Delivery"){

          window.location.replace('/app/vendor_to_facilitation');
         }
         else if(this.role=="Hub"){

          window.location.replace('/app/hub_consignment_list');
         }

         else if(this.role=="Facilitation"){

          window.location.replace('/app/assign_item_from_vendor');
         }
         else if(this.role=="Accountant"){

          window.location.replace('/app/account_dashboard');
         }

           //this.spinner.hide();
        }
         else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title:response.errorDetails.Error,
            showConfirmButton: false,
            timer: 3000
        })
        }

        this.spinner.hide();
      });
    }

    customerRegistration(){
      this.submitted = true;
      if (this.customerregister.invalid) {
        return;
      }
      if(this.customerregister.value.r_pwd!=this.customerregister.value.r_repwd)
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:'Password Mismatch',
          showConfirmButton: false,
          timer: 3000
      })
      return;
      }
      this.r_pwdd= this.MD5_Convert(this.customerregister.value.r_pwd);
      localStorage.setItem('username',this.customerregister.value.r_username);
      var data={
        "UserName":this.customerregister.value.r_username,
        "Email":this.customerregister.value.r_email,
        "mobile":this.customerregister.value.r_phone,
        "role": localStorage.getItem('rol_name')
      }
      localStorage.setItem('reg_mobile',this.customerregister.value.r_phone)
      localStorage.setItem('reg_email',this.customerregister.value.r_email)
      let url = 'Account/CheckAvailable';
      this.allapi.PostData(url,data).subscribe(promise=>
        {
          if(promise.status=="Failed")
          {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title:promise.message,
              showConfirmButton: false,
              timer: 3000
          })
          }
          else if(promise.status=="Success")
          {
            this.otp_guid=promise.ret_guid;
            this.isVisible=2;
          }

        })
  }

  Forgot_submitotp(){
    this.submitted = true;
    if (this.forgetotp.invalid) {
      return;
    }
    this.VerifyOtp = new UntypedFormGroup({
      vrotp: new UntypedFormControl('')
    });
    var data={
      "Role":localStorage.getItem('rol_name'),
      "UserName":this.forgetotp.value.f_username
    }
    let url='Account/checkusername';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
       if(response.status=="Success")
       {
        this.isVisible = 8;
        this.otp_guid=response.ret_guid;
       }
       else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:response.message,
          showConfirmButton: false,
          timer: 3000
      })
       }
      })
  }

  resend_otp(){
    var data={
      "Role":localStorage.getItem('rol_name'),
      "UserName":localStorage.getItem('username'),
    }
    let url='Account/resend_otp';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
       if(response.status=="Success")
       {
        this.otp_guid=response.ret_guid;
         // Timer start
         this.counter = 30;
         this.tick = 1000;
  this.countDown=Subscription;
  this.countDown = timer(0, this.tick)
  .pipe(take(this.counter))
  .subscribe(() => {
    --this.counter;
    // console.log(this.counter);
    if (this.counter == 0) {
      this.countDown.unsubscribe();
    }
  });

  //Timer end

        
         }
       else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:response.message,
          showConfirmButton: false,
          timer: 3000
      })
       }
      })
  }
  resend_registration_otp(){
    var data={
      "Role":localStorage.getItem('rol_name'),
      "UserName":localStorage.getItem('username'),
      "mobile":localStorage.getItem('reg_mobile'),
      "Email":localStorage.getItem('reg_email')
    }
    let url='Account/resend_registration_otp';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
       if(response.status=="Success")
       {
        this.otp_guid=response.ret_guid;
      
       }
       else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:response.message,
          showConfirmButton: false,
          timer: 3000
      })
       }
      })
  }


  submit_registration(){
    this.submitted = true;
    if (this.VerifyOtp.invalid) {
      return;
    }
    this.spinner.show();
    var otp=this.Hashsha256(this.VerifyOtp.value.vrotp);
    // if(this.reg_otp==this.VerifyOtp.value.vrotp)
    // {
    var data={
      "Role": localStorage.getItem('rol_name'),
      "UserName":this.customerregister.value.r_username,
      "Email":this.customerregister.value.r_email,
      "PhoneNumber":this.customerregister.value.r_phone,
      "Password":this.r_pwdd,
      "otp":otp,
      "otp_guid":this.otp_guid,
      "apitype":"Web"
    }
    console.log(data)
    let url='Account/Register_web';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:'Registration Successfull. Please Login',
            showConfirmButton: false,
            timer: 3000
        })
        this.isVisible=0;
        this.spinner.hide();
        this.submitted = false;
        this.customerLogin.reset();
        localStorage.removeItem('reg_mobile');
        localStorage.removeItem('reg_email');
     }
     else{
            Swal.fire({
        position: 'center',
        icon: 'warning',
        title:response.errorDetails.Error,
        showConfirmButton: false,
        timer: 3000
    })
    return
     }
      })
    // }
    // else
    // {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'warning',
    //     title:'OTP Mismatch, Please Enter valid OTP.',
    //     showConfirmButton: false,
    //     timer: 3000
    // })
    // }
    this.spinner.hide();
  }

  forgetresend_otp(){
    var data={
      "role":localStorage.getItem('rol_name'),
      "UserName":this.forgetotp.value.f_username
    }
    let url='Account/resend_otp';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
       if(response.status=="Success")
       {
        this.otp_guid=response.ret_guid;

         // Timer start
         this.counter = 30;
         this.tick = 1000;
  this.countDown=Subscription;
  this.countDown = timer(0, this.tick)
  .pipe(take(this.counter))
  .subscribe(() => {
    --this.counter;
    // console.log(this.counter);
    if (this.counter == 0) {
      this.countDown.unsubscribe();
    }
  });

  //Timer end

       }
       else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:response.message,
          showConfirmButton: false,
          timer: 3000
      })
       }
      })
  }
  submit_forget_otp()
  {

    this.submitted = true;
if (this.VerifyOtp.invalid) {
return;
}
var otp=this.Hashsha256(this.VerifyOtp.value.vrotp);
                var data={
                  "otp":otp,
                   "otp_guid":this.otp_guid,
                }

let url='Account/check_otp_web';
   this.allapi.PostData_login(url,data).subscribe(promise=>
    {
      if(promise.status=="Success")
      {
        this.isVisible=9;
      }
      else if(promise.status=="Failed")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:'OTP Mismatch',
          showConfirmButton: false,
          timer: 3000
          })
          return;
      }
    })
  
  }

 

  changepassword(){
    this.submitted=true;
    if(this.enterpassword.invalid)
    {
      return
    }
if(this.enterpassword.value.f_password!=this.enterpassword.value.f_repassword)
{
Swal.fire({
position: 'center',
icon: 'warning',
title:'Password Mismatch',
showConfirmButton: false,
timer: 3000
})
}
else{
this.pwdd= this.MD5_Convert(this.enterpassword.value.f_password);
var data={
"role":localStorage.getItem('rol_name'),
"UserName":this.forgetotp.value.f_username,
"Password":this.pwdd,
}
let url='Account/changepassword';
this.allapi.PostData_login(url,data).subscribe(promise=>
{
  if(promise.status=="Success")
  {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title:promise.message,
      showConfirmButton: false,
      timer: 3000
  })
  this.isVisible=0;
  }
 else if(promise.status=="Failed")
  {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title:promise.message,
      showConfirmButton: false,
      timer: 3000
  })
  }
})
}
}
get_loginwithotpt(){

                this.submitted=true;
                if(this.loginwithotp.invalid)
                {
                  return;
                }
                localStorage.setItem('username',this.loginwithotp.value.otp_username);
                var data={
                  "role":localStorage.getItem('rol_name'),
                  "UserName":this.loginwithotp.value.otp_username
                }
                let url='Account/resend_otp';
                  this.allapi.PostData_login(url,data).subscribe(response=>
                  {
                   if(response.status=="Success")
                   {
                    this.otp_guid=response.ret_guid;
                    this.isVisible=11;
                     // Timer start
                     this.counter = 30;
                     this.tick = 1000;
  this.countDown=Subscription;
  this.countDown = timer(0, this.tick)
  .pipe(take(this.counter))
  .subscribe(() => {
    --this.counter;
    // console.log(this.counter);
    if (this.counter == 0) {
      this.countDown.unsubscribe();
    }
  });

  //Timer end
                   }
                   else{
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title:response.message,
                      showConfirmButton: false,
                      timer: 3000
                  })
                   }
                  })
              }

get_loginwithotp_resend(){

                var data={
                  "role":localStorage.getItem('rol_name'),
                  "UserName":localStorage.getItem('username')
                }
                let url='Account/resend_otp';
                  this.allapi.PostData_login(url,data).subscribe(response=>
                  {
                   if(response.status=="Success")
                   {
                    this.otp_guid=response.ret_guid;
                     // Timer start
                     this.counter = 30;
                     this.tick = 1000;
  this.countDown=Subscription;
  this.countDown = timer(0, this.tick)
  .pipe(take(this.counter))
  .subscribe(() => {
    --this.counter;
    // console.log(this.counter);
    if (this.counter == 0) {
      this.countDown.unsubscribe();
    }
  });

  //Timer end
                   }
                   else{
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title:response.message,
                      showConfirmButton: false,
                      timer: 3000
                  })
                   }
                  })
              }

submit_loginwithotp(){
                this.submitted = true;
                if (this.login_otp.invalid) {
                  return;
                }
               this.spinner.show();
                // if(this.reg_otp!=this.login_otp.value.login_otp_enter)
                // {
                //   Swal.fire({
                //     position: 'center',
                //     icon: 'warning',
                //     title:'OTP Mismatch',
                //     showConfirmButton: false,
                //     timer: 3000
                // })
                // this.spinner.hide();
                // return;
                // }

 var otp=this.Hashsha256(this.login_otp.value.login_otp_enter);
//var otp=this.MD5_Convert(this.login_otp.value.login_otp_enter);


                var data={
                  "UserName":localStorage.getItem('username'),
                   "role":localStorage.getItem('rol_name'),
                   "session_cart":localStorage.getItem('v_cart'),
                   "otp":otp,
                   "otp_guid":this.otp_guid,
                }

                let requestFormUrl = 'Account/login_with_otp_web';
                   this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {
                   if (response.code == 200) {

                      localStorage.setItem('idToken', response.entity.token);
                      localStorage.setItem('log_id', response.entity.log_id);
                      localStorage.setItem('roleid', response.entity.roleid);
                      localStorage.setItem('userid', response.entity.userId);
                      localStorage.setItem('isvendor',response.entity.is_vendor_doc);
                      localStorage.setItem('isvendorprofile', response.entity.is_vendor_profile);
                      localStorage.setItem('rolename',response.entity.role);
                      this.authService.setSecureToken(response.entity.token);
                      this.authService.setSecureRole(response.entity.role);
                      this.role = response.entity.role;
                      this.role_v = response.entity.role;
                      this.formModel = new window.bootstrap.Modal(
                        document.getElementById("loginModal")
                      );
                      this.formModel.hide();
                      localStorage.removeItem('v_cart');
                      this.isvendor=localStorage.getItem('isvendor');
                      this.isvendorprofile=localStorage.getItem('isvendorprofile');

                      if(this.role=="Customer")
                      {
                       let redirectpage= localStorage.getItem('redirect_page');
                          if(redirectpage!=null)
                       {
                        window.location.replace(redirectpage);
                       }
                       else{
                        window.location.replace('/app/home');
                       }

                      }
                    else if(this.role=="Vendor")
                    {
                      if(this.isvendor=="0" || this.isvendorprofile=="false")
                      {
                        window.location.replace("/app/vendordocuments");
                      }
                      else if(this.role=="Vendor" && this.isvendor=="1" || this.isvendorprofile=="true")
                      {
                        window.location.replace("/app/vendordashboard");
                      }
                    }
                   else if(this.role=="SuperAdmin"){

                    window.location.replace('/app/admindashboard');
                   }
                   else if(this.role=="Delivery"){

                    window.location.replace('/app/vendor_to_facilitation');
                   }
                   else if(this.role=="Hub"){

                    window.location.replace('/app/hub_consignment_list');
                   }
                   else if(this.role=="Facilitation"){

                    window.location.replace('/app/assign_item_from_vendor');
                   }
                   else if(this.role=="Accountant"){

                    window.location.replace('/app/account_dashboard');
                   }

                  }
                   else {
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title:response.errorDetails.Error,
                      showConfirmButton: false,
                      timer: 3000
                  })
                  }

                });
                this.spinner.hide();
              }



  doSomething(){

    this.formModel.hide();
  }

  doSomethings(){

    this.formModels.hide();
  }


  openModal(){
    this.formModels = new window.bootstrap.Modal(
      document.getElementById("sModal")
    );
    this.formModels.show();
    //let a = prompt("Search Product")
    //window.location.replace('app/search-result/'+a)
  }

   //validation
get f(){
  return this.customerLogin.controls;
}
get g(){
  return this.customerregister.controls;
}
get i(){
  return this.forgetotp.controls;
}
get j(){
  return this.VerifyOtp.controls;
}
get k(){
  return this.enterpassword.controls;
}
get l(){
  return this.loginwithotp.controls;
}
get m(){
  return this.login_otp.controls;
}


// form group
  customerregister = new UntypedFormGroup({
    r_username: new UntypedFormControl('', [Validators.required]),
    r_email: new UntypedFormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    r_phone: new UntypedFormControl('',[Validators.required]),
    r_pwd: new UntypedFormControl('',[Validators.required, Validators.minLength(8)]),
    r_repwd: new UntypedFormControl('',[Validators.required]),
  });
  VerifyOtp = new UntypedFormGroup({
    vrotp:new UntypedFormControl('',[Validators.required])
  });
  enterpassword = new UntypedFormGroup({
    f_password:new UntypedFormControl('',[Validators.required, Validators.minLength(6)]),
    f_repassword:new UntypedFormControl('',[Validators.required])
  });

  forgetotp = new UntypedFormGroup({
    f_username:new UntypedFormControl('',[Validators.required])
  });

  loginwithotp=new UntypedFormGroup({
    otp_username:new UntypedFormControl('',[Validators.required])
  });
  login_otp=new UntypedFormGroup({
    login_otp_enter:new UntypedFormControl('',[Validators.required])
  })
  SearchForm = new UntypedFormGroup({
    Searchstring: new UntypedFormControl('',[
      Validators.required,
      Validators.minLength(1)]),
  });
  onSubmit(){
    let a =this.SearchForm.value.Searchstring.trim().length;
    if(a>0){
        let str = this.SearchForm.value.Searchstring
        window.location.replace('../app/search-result/'+str)

    }



  }

  click_add_to_cart(ss:any,aa:any)
  {

    var data = {
      "product_id": ss,
      "item_id": aa
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
        if(response.cartlist!="")
        {
          this.cartcount=response.cartlist.length;
        }

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 3000
      });

      }



 });
  }

  show_add_to_cart()
  {
   if(localStorage.getItem('Role')=="Public")
   {
    window.location.replace('/app/public_cart');
   }
   else{

    window.location.replace('/app/cart');

   }


  }
  show_wish_list()
  {
    window.location.replace('/app/wish_list');
  }
  setCustomerText(e:any ){
    // this.temp1=e
  
  }

  keyPressSpace(event:any) {
    // if(event.target.selectionStart===0 && event.code==='Space')
    if(event.code==='Space')
    {
      event.preventDefault();
    }
  }
}

