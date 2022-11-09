import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {

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
    pagename: new UntypedFormControl('',[Validators.required]),
    pageurl: new UntypedFormControl('',[Validators.required]),
  
  });

   base64="data:image/jpeg;base64,";
   Url='http://124.153.106.183:8015/EMarket_Image';
 
   search="";
   submitted=false;
   mp_id=0;
   mp_pagename="";
   mp_pageurl="";
   page_list:any;


  ngOnInit(): void {
    let url='Master_Module/get_data_page/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
       this.page_list=JSON.parse(promise.page_list).Table;
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
    "mp_id":this.mp_id,
    "mp_pagename":this.mp_pagename.trim(),
    "mp_pageurl":this.mp_pageurl.trim(),
     "language_id":1
  }
  let url='Master_Module/save_page/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status=="Insert")
      {
        this.mp_id=0;
        this.submitted = false;
        this.form.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      this.page_list=JSON.parse(promise.page_list).Table;

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
edit_page(ss:any)
{
this.mp_id=ss.mp_id,
 this.mp_pagename=ss.mp_pagename,
 this.mp_pageurl=ss.mp_pageurl

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
              "mp_id": ss.mp_id,
              "mp_activeflg":ss.mp_activeflg,
              "language_id": 1
          }
          let url='Master_Module/active_deactive_page/'
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
            this.page_list=JSON.parse(promise.page_list).Table;
      
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
  this.mp_id=0;
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
