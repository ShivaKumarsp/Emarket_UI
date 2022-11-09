import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-role-module-page',
  templateUrl: './map-role-module-page.component.html',
  styleUrls: ['./map-role-module-page.component.css']
})
export class MapRoleModulePageComponent implements OnInit {

   
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  public myform:any;

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:UntypedFormBuilder) 
   { }

  form = new UntypedFormGroup({
    vrole: new UntypedFormControl('',[Validators.required]),
    vmodule: new UntypedFormControl('',[Validators.required]),
    vpage: new UntypedFormControl('',[Validators.required]),
  });

   base64="data:image/jpeg;base64,";
   Url='http://124.153.106.183:8015/EMarket_Image';
 
   search="";
   submitted=false;
   rmpm_id=0;
   role_id="";
   mm_id="";
   mp_id="";
 
   role_list:any;
   module_list:any;
   page_list:any;
   role_module_page_map_list:any;


  ngOnInit(): void {
    let url='Master_Module/get_data_map/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
       this.role_list=JSON.parse(promise.role_list).Table;
       this.module_list=JSON.parse(promise.module_list).Table;
       this.page_list=JSON.parse(promise.page_list).Table;
       this.role_module_page_map_list=JSON.parse(promise.role_module_page_map_list).Table;
      })
      window.scrollTo(0,0);
  }

savedata()
{

  this.submitted = true;

    if (this.form.invalid) {
      return;
    }


  var data={
    "rmpm_id":this.rmpm_id,
    "role_id":this.role_id,
    "mm_id":this.mm_id,
    "mp_id":this.mp_id,
        "language_id":1
  }
  let url='Master_Module/save_map/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status=="Insert")
      {
        this.rmpm_id=0;
        this.submitted = false;
        this.form.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      this.role_list=JSON.parse(promise.role_list).Table;
       this.module_list=JSON.parse(promise.module_list).Table;
       this.page_list=JSON.parse(promise.page_list).Table;
 this.role_module_page_map_list=JSON.parse(promise.role_module_page_map_list).Table;
    }
      else if(promise.status=="Failed")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      }
     

    })
}
edit_module(ss:any)
{
this.rmpm_id=ss.rmpm_id,
 this.role_id=ss.role_id,
 this.mm_id=ss.mm_id,
 this.mp_id=ss.mp_id,

window.scrollTo(0,0);
}

active_deactive(ss:any) {
  var flg="";
if(ss==true)
{
  flg="DE-Activate"
}
  Swal.fire({
      title: 'Are you sure?',
      text: "Do You want " +flg+ " This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ' +flg+ ' it!'
  }).then((result) => {
      if (result.isConfirmed) {

          var data = {
              "rmpm_id": ss.rmpm_id,
              "active_flg":ss.active_flg,
              "role_id":ss.role_id,
              "language_id": 1
          }
          let url='Master_Module/active_deactive_map/'
          this.allapi.PostData(url, data).subscribe(promise=> {
            if(promise.status=="Insert")
            {
              this.submitted = false;
              this.form.reset();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: promise.message,
                showConfirmButton: false,
                timer: 3000
            })
            this.role_list=JSON.parse(promise.role_list).Table;
            this.module_list=JSON.parse(promise.module_list).Table;
            this.page_list=JSON.parse(promise.page_list).Table;
            this.role_module_page_map_list=JSON.parse(promise.role_module_page_map_list).Table;
          }
            else if(promise.status=="Failed")
            {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: promise.message,
                showConfirmButton: false,
                timer: 3000
            })
            }
            
          })

      }
  })

};




Clear()
{
  this.rmpm_id=0;
  this.submitted = false;
  this.form.reset();
}


  //validation
  get f(){
    return this.form.controls;
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }



}
