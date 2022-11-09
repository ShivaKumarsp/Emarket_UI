import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { CartService } from 'src/app/AllPageService/CartService/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})

export class SearchresultComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute,
    private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder: UntypedFormBuilder,
   private cartService : CartService){

   }

   base64="data:image/jpeg;base64,";
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  searchTxt:any=''
  responseSearch:any=[]
  product_list:any

  rangeGroup = new UntypedFormGroup({
    rangeInput: new UntypedFormControl(''),
  });


  ngOnInit(): void {
    this.searchTxt =this._Activatedroute.snapshot.paramMap.get("search")?.toString()
     this.searchTxt = decodeURIComponent(this.searchTxt)

    var data={
      "searchstring":this.searchTxt,
      "language_id":1
    }
 
    let getresult='search_result/getresult/'
    this.allapi.PostData(getresult,data).subscribe(promise=>{
              this.product_list=promise.resultlist;        

    })


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
             this.cartService.addtoCart(response.cartlist.length);
      //  window.location.reload();
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
        
          window.location.reload();
          }
          
        
          
     });
      }  

      remove_wish_list(_ss:any)
      {
       
        var data = {
          "product_id": _ss.productid,
          "item_id": _ss.itemid,
         
        }
          let requestFormUrl = 'Landing_Item_Details/remove_wish_list/';
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
