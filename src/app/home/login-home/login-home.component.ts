import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
declare var window: any;

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {
  AES_Encrypt(ptext:any){
    return CryptoJS.AES.encrypt(ptext,this.salt).toString();  
  }

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

  MD5_Convert(plaintext:string){
    let hash= (CryptoJS.MD5(plaintext))
    return CryptoJS.enc.Base64.stringify(hash);
  } 
  public customerLogin!: UntypedFormGroup;
  //public customerregister!: FormGroup;
  constructor(  
 
    private httpClient: HttpClient,
  private http: HttpClient,
 private router: Router,
 private allapi:AllapiService,
 private authService:AuthService,
 private formBuilder:UntypedFormBuilder,
 private spinner: NgxSpinnerService) { }
 

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
    slides = [
      {id: 1, img: "assets/img/hero-bg-2.jpg"},
      {id: 2, img: "assets/img/hero-bg-2.jpg"},
      {id: 3, img: "assets/img/hero-bg.jpg"}
    ];

    SliderSetting: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true
    }


btn_dissable:boolean=true;
salt_token:any;
  hash_pwd="";
  product_list:any;
  category_list:any;
  short_view_detail:any;
  salt="";
  homemenu=false;
  submitted=false;
  public role="";
 public pwd="";
 public rememberMe="";
  roleid =0;
  reg_otp:any;
 templateformdata = {
  "UserName": "",
  "Password": "",
  "role": ""
  }

  formModel:any;
  isVisible: any=0;
  pwdd:any;
  r_pwdd:any;
  ipAddress="";
  slt1:any;
  slttkn1:any;

  ngOnInit(): void {
    this.spinner.show();
     this.customerLogin = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      pass: new UntypedFormControl('',[Validators.required]),
    });   

    this.getIPAddress();
    let requestFormUrl='Landing/getdata/'; 
  this.allapi.GetDataById_login(requestFormUrl,1).subscribe(response => {   
    this.product_list =JSON.parse(response.product_list).Table;
      this.category_list = JSON.parse(response.category_list).Table;
      this.salt=response.salt;
      this.salt_token=response.salt_token;    

  });  
  this.spinner.hide();
}

  showForm(ids:any){
    alert(this.role)
    this.customerregister = new UntypedFormGroup({
      r_username: new UntypedFormControl(''),
      r_email: new UntypedFormControl(''),
      r_phone: new UntypedFormControl(''),
      r_pwd: new UntypedFormControl(''),
      r_repwd: new UntypedFormControl('')
  });
 this.forgetotp=new UntypedFormGroup({
  f_username: new UntypedFormControl('')
 })
 this.loginwithotp=new UntypedFormGroup({
  otp_username: new UntypedFormControl('')
 })

    this.isVisible = ids;
  }
  doSomething(){
    this.formModel.hide();
  }
 

click_login(ss: any){
  this.isVisible=0;
  this.btn_dissable=true;
  this.customerLogin = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    pass: new UntypedFormControl(''),
});
  this.role=ss;
  sessionStorage.setItem('rolename',ss);
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
}

click_login_fromitem(ss: any,slt:any,salttoken:any){
  this.isVisible=0;   
   localStorage.setItem('slt',slt);
  localStorage.setItem('tkn',salttoken);
  localStorage.setItem('rolename',ss);
  this.formModel = new window.bootstrap.Modal(
    document.getElementById("loginModal")
  );    
  this.formModel.show();
  this.role=ss.toString();
 
}


  userLoginProcess=()=>{
    alert(this.role)
    this.spinner.show();
    this.submitted = true;
    if (this.customerLogin.invalid) {
      return;
    }
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

    this.btn_dissable=false;     
    this.pwdd= this.MD5_Convert(this.customerLogin.value.pass);        
    let hash= this.MD5_Convert(this.pwdd.toString()+this.salt);
    this.customerLogin.patchValue({
      pass: this.pwdd
      });

    var role=sessionStorage.getItem('rolename'); 
    var data={
      "UserName":this.customerLogin.value.name,
      "Password":hash.toString(),
       "role":this.role,
      "salt_token":this.salt_token,
      "ipAddress":this.ipAddress,
      "apitype":"Web",
      "method_details":"userLoginProcess(Login)"
    }   
    let requestFormUrl = 'Account/login';
       this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {
       if (response.code == 200) {              
        localStorage.setItem('idToken', response.entity.token); 
        localStorage.setItem('log_id', response.entity.log_id); 
        localStorage.setItem('roleid', response.entity.roleid);
        localStorage.setItem('userid', response.entity.userId);        
        this.authService.setSecureToken(response.entity.token);
        this.authService.setSecureRole(response.entity.role);            
          this.role = response.entity.role;
      
            this.formModel = new window.bootstrap.Modal(
          document.getElementById("loginModal")         
        );    
        this.formModel.hide();
        // this.customerLogin = new FormGroup({     
        //   pass: new FormControl('') 
        // });
        if(this.role=="Customer")
        {         
          window.location.replace('/app/home');
        }
        else if(this.role=="Vendor")
        {       
          window.location.replace("/app/vendordashboard");
        }
       else if(this.role=="SuperAdmin"){
    
        window.location.replace('/app/admindashboard');
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
      this.btn_dissable=true;
      this.spinner.hide();
    });
  } 
  customerRegistration(){
    alert(this.role)
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

    var data={
      "UserName":this.customerregister.value.r_username,
      "Email":this.customerregister.value.r_email,
      "mobile":this.customerregister.value.r_phone,
      "role": this.role
    }
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
          this.reg_otp=promise.reg_otp;
          this.isVisible=5;
        }
       
      })
    

}
submit_registration(){
  this.submitted = true;
  if (this.VerifyOtp.invalid) {
    return;
  }
  if(this.reg_otp==this.VerifyOtp.value.vrotp)
  {
  var data={
    "Role":this.role,
    "UserName":this.customerregister.value.r_username,
    "Email":this.customerregister.value.r_email,
    "PhoneNumber":this.customerregister.value.r_phone,
    "Password":this.r_pwdd,  
    "apitype":"Web"  
  }
  let url='Account/Register';
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
      //this.spinner.hide();
   }
    })
  }
  else
  {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title:'OTP Mismatch, Please Enter valid OTP.',
      showConfirmButton: false,
      timer: 3000
  }) 
  }
}

resend_otp(){
 
  var data={
    "Role":this.role,
    "UserName":this.customerLogin.value.name   
  }
  let url='Account/resend_otp';
    this.allapi.PostData_login(url,data).subscribe(response=>
    {
     if(response.status=="Success")
     {
      this.reg_otp=response.reg_otp;
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


Forgot_submitotp(){
  this.submitted = true;
  if (this.forgetotp.invalid) {
    return;
  }

  this.VerifyOtp = new UntypedFormGroup({     
    vrotp: new UntypedFormControl('') 
  });

  var data={
    "Role":this.role,
    "UserName":this.forgetotp.value.f_username 
  }
  let url='Account/checkusername';
    this.allapi.PostData_login(url,data).subscribe(response=>
    {
     if(response.status=="Success")
     {
      this.isVisible = 8;
      this.reg_otp=response.reg_otp;
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
forgetresend_otp(){
 
  var data={
    "role":this.role,
    "UserName":this.forgetotp.value.f_username 
  }
  let url='Account/resend_otp';
    this.allapi.PostData_login(url,data).subscribe(response=>
    {
     if(response.status=="Success")
     {
      this.reg_otp=response.reg_otp;
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
                if(this.reg_otp!=this.VerifyOtp.value.vrotp)
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
                else{
                  this.isVisible=9;
                }
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
    "role":this.role,
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
                var data={
                  "role":this.role,
                  "UserName":this.loginwithotp.value.otp_username 
                }
                let url='Account/resend_otp';
                  this.allapi.PostData_login(url,data).subscribe(response=>
                  {
                   if(response.status=="Success")
                   {
                    this.reg_otp=response.reg_otp;
                    this.isVisible=11;
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
                  "role":this.role,
                  "UserName":this.loginwithotp.value.otp_username 
                }
                let url='Account/resend_otp';
                  this.allapi.PostData_login(url,data).subscribe(response=>
                  {
                   if(response.status=="Success")
                   {
                    this.reg_otp=response.reg_otp;
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
   submit_loginwithotp=()=>{
                this.submitted = true;
                if (this.login_otp.invalid) {
                  return;
                }
                if(this.reg_otp!=this.login_otp.value.login_otp_enter)
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
                var data={
                  "UserName":this.loginwithotp.value.otp_username,               
                   "role":this.role               
                }
               
                let requestFormUrl = 'Account/login_with_otp_web';
                   this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {
                   if (response.code == 200) {    
                       this.customerLogin = new UntypedFormGroup({     
                        pass: new UntypedFormControl('') 
                      });
                    sessionStorage.setItem('idToken', response.entity.token); 
                    sessionStorage.setItem('log_id', response.entity.log_id); 
                    sessionStorage.setItem('roleid', response.entity.roleid);
                    sessionStorage.setItem('userid', response.entity.userId);
                    this.authService.setSecureToken(response.entity.token);       
                      this.role = response.entity.role;
               
                        this.formModel = new window.bootstrap.Modal(
                      document.getElementById("loginModal")         
                    );    
                    this.formModel.hide();
            
                    if(this.role=="Customer")
                    {
                     
                      window.location.replace('/app/home');
                    }
                    else if(this.role=="Vendor")
                    {
                   
                      window.location.replace("/app/vendordashboard");
                    }
                   else if(this.role=="SuperAdmin"){
                
                    window.location.replace('/app/admindashboard');
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
                  this.btn_dissable=true;
                });
              } 

get_category_page(ss:any)
{
  sessionStorage.setItem('category_id', ss.mcid);
  window.location.replace("publiccategory");
  
}

short_view(ss:any) {
  this.formModel = new window.bootstrap.Modal(
    document.getElementById("exampleModal")         
  );    
  this.formModel.show(); 
          this.short_view_detail = ss;
      }
  redirect_home()
  {
   
    window.location.replace("/home")
  }

  getIPAddress()
  {    
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;   
    });
  }

  add_to_cart(ss: any){
    this.btn_dissable=true;
    this.customerLogin = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      pass: new UntypedFormControl(''),
  });
    this.role="Customer";
    sessionStorage.setItem('rolename',ss);
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
  }

  view_page(ss:any)
  {
    sessionStorage.setItem('itemid',ss.itemid);
     window.location.replace("/singleitemdetails")
    // this.router.navigate(["/app/home/itemdetails"]);
  }
  

 // form group
  customerregister = new UntypedFormGroup({
    r_username: new UntypedFormControl('', [Validators.required]),
    r_email: new UntypedFormControl('',[Validators.required]),
    r_phone: new UntypedFormControl('',[Validators.required]),
    r_pwd: new UntypedFormControl('',[Validators.required]),
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

  // no using
  VendorLogin = new UntypedFormGroup({
      vemail: new UntypedFormControl(),
      vpassword: new UntypedFormControl(),

  });

   vendorReg = new UntypedFormGroup({
    vrusername:new UntypedFormControl(),
    vremail: new UntypedFormControl(),
    vrphone:new UntypedFormControl(),
    vrpassword: new UntypedFormControl(),
    vrconfirmpassword: new UntypedFormControl(),
  });

  CustomerForget = new UntypedFormGroup({
    fremail:new UntypedFormControl(),

  });

 
  AdminLogin = new UntypedFormGroup({
    aemail: new UntypedFormControl(),
    apassword: new UntypedFormControl(),
  });
  adminReg = new UntypedFormGroup({
    arusername:new UntypedFormControl(),
    aremail: new UntypedFormControl(),
    arphone:new UntypedFormControl(),
    arpassword: new UntypedFormControl(),
    arcconfirmpassword2: new UntypedFormControl(),
  });
 
 
  loginVendorSubmit(){
    console.log(this.VendorLogin.value);
    console.log(this.VendorLogin);
    if(confirm("close this?")){

    }
  }
  VendorRegistration(){
  
    if(confirm("Close this?")){
      this.doSomething();
    } 
  }
 


  AdminRegistration(){
  
    if(confirm("Close this?")){
      this.doSomething();
    } 
  }

}
