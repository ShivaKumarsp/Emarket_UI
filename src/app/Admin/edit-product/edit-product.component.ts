import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:UntypedFormBuilder,
   private activateroute:ActivatedRoute) { { this.form = formBuilder.group({
    catname:new UntypedFormControl('',[Validators.required]),
    sub_cat:new UntypedFormControl('',[Validators.required]),
    add_cat:new UntypedFormControl('',[Validators.required]),
    producttype: new UntypedFormControl('',[Validators.required]),
    productname_en: new UntypedFormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9_ ]*$")]),
    baseprice:new UntypedFormControl('',[Validators.required]),
    hsn:new UntypedFormControl('',[Validators.required]),
    ian: new UntypedFormControl('', [Validators.required]),
    uom:new UntypedFormControl('',[Validators.required]),
    bommm: new UntypedFormControl('', [Validators.required]),
    short_desc_en: new UntypedFormControl('',[Validators.required]),
    itemimage: new UntypedFormControl('',[Validators.required]),

  }); }}
  validation_list:any;
  public form: UntypedFormGroup;
  uom_weight_list:any;
  uom_size_list:any;
  category_list:any;
  product_type_list:any;
  brand_list:any;
  uom_list:any;
  uom_list_temp:any;
  cat_id="";
  sub_cat_id="";
  additionalcat_id="";
  sub_category_list:any;
  additional_category_list:any;
  product_type_id="";
  product_name="";
  base_price="";
  hsn_code="";
  ian_code="";
  uom_id="";
  is_contains_bom:boolean=false;
  short_description="";
  p_imageurl="";
  product_id=0;
  SelectedFile_Array:any;
  self_manufacturer="";
  is_perishable="";
  brand_id="";
  uom_weight_type_id="";
  ipAddress="";
 btn_dissable:boolean=false;
 productid:any;
 base64='data:image/jpeg;base64,';
 imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
 imageChangedEvent: any = '';
 croppedImage:any;
 selectItemImageUpload:any;

  ngOnInit(): void {
    this.form.controls['hsn'].disable();
    window.scrollTo(0,0);
    this.productid=this.activateroute.snapshot.paramMap.get("productid");

    this.getIPAddress();
    var data = {
      "language_id": 1,
      "product_id": parseInt(this.productid)
  }
  let url='All_Product/get_edit_data/';
    this.allapi.PostData(url, data).subscribe(promise=> {
      this.uom_weight_list = [];
      this.uom_size_list = [];
      this.category_list = promise.category_list;
      this.product_type_list = promise.product_type_list;
      this.brand_list = promise.brand_list;
      this.uom_list = promise.uom_list;
      this.uom_list_temp = promise.uom_list;
      this.uom_list_temp.forEach((ss:any)=>
      {
        if (ss.uomtype == 'Weight') {
          this.uom_weight_list.push(ss);
      }
      else if (ss.uomtype == 'meter') {
          this.uom_size_list.push(ss);
      }
      })


      this.product_id = promise.single_product_list[0].productid;
      this.cat_id = promise.single_product_list[0].categoryid;
      this.get_sub_category(this.cat_id);
      this.sub_cat_id = promise.single_product_list[0].subcategory_id;
      this.get_spl_category(this.cat_id, this.sub_cat_id)
      this.additionalcat_id = promise.single_product_list[0].additionalcat_id;
      this.brand_id = promise.single_product_list[0].brandid;
      this.product_type_id = promise.single_product_list[0].producttype_id;
      this.product_name = promise.single_product_list[0].productname;
      this.base_price = promise.single_product_list[0].baseprice;
      this.hsn_code = promise.single_product_list[0].hsncode;
      this.ian_code = promise.single_product_list[0].iancode;
      this.uom_id = promise.single_product_list[0].uomid;
      this.uom_weight_type_id = promise.single_product_list[0].uomweight;
       this.is_contains_bom = promise.single_product_list[0].iscontains_bom;
      this.self_manufacturer = promise.single_product_list[0].selfmanufacturer;
      this.is_perishable = promise.single_product_list[0].isperishable;
      this.short_description = promise.single_product_list[0].shortdescription;
      this.p_imageurl = promise.single_product_list[0].imagepath;
      //$('#productimg').attr('src', this.p_imageurl);
  });
  }

  get_sub_category (mcid:any) {
    this.base_price=""; 
    var data = {
        "category_id": parseInt(mcid),
        "language_id": 1,
        "ipAddress":this.ipAddress,
        "apitype":"Web"
    }
    let url='AddProduct/get_sub_category/';
    this.allapi.PostData(url, data).subscribe(promise=> {
        if (promise.sub_category_list != "") {
            this.sub_category_list = promise.sub_category_list;
        }

    })
}
get_spl_category(mcid:any, mscid:any) {
  this.base_price=""; 
  var data = {
      "category_id": parseInt(mcid),
      "sub_category_id": parseInt(mscid),
      "language_id": 1,
      "ipAddress":this.ipAddress,
      "apitype":"Web"
  }

  let requestFormUrl = 'AddProduct/get_spl_category/';
    this.allapi.PostData(requestFormUrl,data).subscribe(response =>  {
      if (response.msg_flg == "Failed") {

          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: response.message,
              showConfirmButton: false,
              timer: 3000
          })
      }
      else {
          if (response.additional_category_list != "") {
              this.additional_category_list = response.additional_category_list;
          }
      }
  })
}
get_add_category()
{
  this.base_price=""; 
}
get_hsncode(mcid:any, mscid:any, add_cat_id:any)
{
var data={
  "category_id": parseInt(mcid),
  "sub_category_id": parseInt(mscid),
  "additional_cat_id": parseInt(add_cat_id),
  "base_price":parseInt(this.base_price),
  "language_id":1
}
let url = 'AddProduct/get_hsn_code/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
        if(promise.hsn_code_list.length>0)
    {
    this.hsn_code=promise.hsn_code_list[0].hsn_code;
    }
    else{
      this.base_price="";
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Enter HSN Code for Selected Category',
        showConfirmButton: false,
        timer: 3000
    })
    //return
    }
  
  })
}

selectFileUpload(event: any): void {
  this.imageChangedEvent = event;
}
imageLoaded(image: LoadedImage) {
  // show cropper
}
cropperReady() {
  // cropper ready
}
loadImageFailed() {
  // show message
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
  let newfile = this.dataURLtoFile(this.croppedImage,'file.jpg');
        // const elem = window.document.createElement('a');
        //     elem.href = window.URL.createObjectURL(newfile);
        //     elem.download = 'newfile.jpg';
        //     document.body.appendChild(elem);
        //     elem.click();
        //     document.body.removeChild(elem);      
            
        var formData = new FormData();
      
        this.selectItemImageUpload = newfile;
        formData.append("File", this.selectItemImageUpload);
        let url = 'http://49.205.194.238:1300/api/ImageUpload/Product_Image_Upload';
        return this.http.post('http://49.205.194.238:1300/api/ImageUpload/Product_Image_Upload', formData).subscribe((promise: any) => {
         this.p_imageurl = promise.path;
        })
}

dataURLtoFile(dataurl:any, filename:any) {

  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}


// selectFileUpload(imageInput: any) {
//   var formData = new FormData();
//   const file: File = imageInput.files[0];

// if (imageInput.files[0].type != "image/jpeg") {
//       Swal.fire({
//         position: 'center',
//         icon: 'warning',
//         title: 'Please Upload the JPEG file',
//         showConfirmButton: false,
//         timer: 3000
//     })
//         return;
//     } else if (imageInput.files[0].size > 2097152) {
//       Swal.fire({
//         position: 'center',
//         icon: 'warning',
//         title: 'mage size should be less than 2MB',
//         showConfirmButton: false,
//         timer: 3000
//     })
//         return;
//     }
//     else
//     {
//       this.SelectedFile_Array=imageInput.files[0];
//       formData.append("File", this.SelectedFile_Array);
//       let url='ImageUpload/Product_Image_Upload/';
//       return this.http.post('http://49.205.194.238:1300/api/ImageUpload/Product_Image_Upload', formData).subscribe((promise:any)=>
//       {
//        this.p_imageurl=promise.path;
//       });
//     }
// }

savedata  () {

  this.btn_dissable=false;
  if(this.form.value.productname_en.trim() ==''){
    this.form.controls['productname_en'].setErrors({'required': true})
    return ;
  }
  if(this.base_price==""){
      this.form.controls['baseprice'].setErrors({'required': true})
    return ;
  }
  if(this.form.value.short_desc_en.trim() ==''){
    this.form.controls['short_desc_en'].setErrors({'required': true})
    return;
  }
  if(this.form.value.baseprice.length < 8){
    this.form.controls['baseprice'].setErrors({'required': true})
    return;
  }

  
  if(this.hsn_code==null||this.hsn_code=="")
  {
    this.base_price="";
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Enter HSN Code for Selected Category',
      showConfirmButton: false,
      timer: 3000
  })
  return
  }

    var data = {
        "product_id": this.product_id,
        "category_id": parseInt(this.cat_id),
        "sub_category_id": parseInt(this.sub_cat_id),
        "additional_cat_id": parseInt(this.additionalcat_id),
        "brand_id": 0,
        "product_type_id": parseInt(this.product_type_id),
        "product_name": this.product_name,
        "product_code": "",
        "base_price": parseInt(this.base_price),
        "hsn_code": this.hsn_code,
        "ian_code": this.ian_code,
        "uom_id": parseInt(this.uom_id),
        "uom_weight_type_id": 0,
        "product_weight": 0,
        "uom_size_type_id": 0,
        "product_size_l":0,
        "product_size_b": 0,
        "product_size_h": 0,
        "self_manufacturer": false,
        "is_perishable": false,
        "is_contains_bom": false,
        "short_description": this.short_description,
        "image_path": this.p_imageurl,
        "language_id": 1,
        "ipAddress":this.ipAddress,
        "apitype":"Web"
    }

let url='All_Product/Update_Product/'
    this.allapi.PostData(url, data).subscribe(promise=> {
        if (promise.status == "Update") {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product Updated Successfully.',
                showConfirmButton: false,
                timer: 3000
            })


            this.router.navigate(["/app/addproductspecification/"+promise.ret_product_id]);

            //window.location.reload();
        }
        else if (promise.status == "Failed") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: promise.message,
                showConfirmButton: false,
                timer: 3000
            })
        }
        else if (promise.status == "Validation") {
          this.validation_list=promise.validation_list;
      }
        else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: (promise.msg_flg),
                showConfirmButton: false,
                timer: 5000
            })
        }

        this.btn_dissable=true;
    })

};
go_next  () {
  this.router.navigate(["/app/addproductspecification/"+this.product_id]);

};
Clear()
{

}
getIPAddress()
{

this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
  this.ipAddress = res.ip;

});
}

  //validation
get f(){
  return this.form.controls;
}
}
