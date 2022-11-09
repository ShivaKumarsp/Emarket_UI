
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { HeaderComponent } from 'src/app/component/header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private header:HeaderComponent) { }
   wish_list:any;
 
  
   base64='data:image/jpeg;base64,';
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  ngOnInit(): void {
let url='WishList/get_data/';      
      this.allapi.GetDataById(url, 1).subscribe(promise=>{       
          this.wish_list = [];
          this.wish_list =JSON.parse(promise.wish_list).Table;  
          if( this.wish_list=="")      
          {  
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Wishlist Is Empty, Please Add Product To Wishlist',
                showConfirmButton: false,
                timer: 3000
            })
          }  
      });
  }

  remove_from_wishlist(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Remove This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Remove it!'
    }).then((result) => {
        if (result.isConfirmed) {
          var data = {
            "product_id": ss.productid,
            "item_id": ss.itemid,
            "language_id":1           
          }
          let url='WishList/remove_from_wishlist/';      
          this.allapi.PostData(url, data).subscribe(promise=>{     
            if(promise.status=='Success')
            {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Item Removed From Wishlist',
                showConfirmButton: false,
                timer: 3000
            });
            this.wish_list =JSON.parse(promise.wish_list).Table; 
            if( this.wish_list=="")      
            {  
              Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Wishlist Is Empty, Please Add Product To Wishlist',
                  showConfirmButton: false,
                  timer: 3000
              })
            }         
            window.location.reload();
            }  
            else 
            {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Failed To Remove From Wishlist',
                showConfirmButton: false,
                timer: 3000
            });
          
            } 
          });

        }
    })

  };

 
 
 

  viewproductdetails(_ss:any)
  { 
    window.location.replace("/app/home/itemdetails/" + _ss.itemid);   
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
        //
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
        //this.cartservice.addtoCart(response.cartlist.length)
        //this.header.cartcount=response.cartlist.length;
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

    select_category(ss:any)
    {
      //landingcategory
    var sss=ss.additionalcat_id;
    alert(sss)
    }
    groupBy(list: any[], property: string | number) {
      return list.reduce((groups, item) => {
          const val = item[property];
          groups[val] = groups[val] || [];
          groups[val].push(item);
          return groups;
      }, {});
    }

    }



    