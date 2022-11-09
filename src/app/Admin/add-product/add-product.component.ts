import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    public form: UntypedFormGroup;
    addproduct: UntypedFormGroup | undefined;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:UntypedFormBuilder) { this.form = formBuilder.group({
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

  }); }


  //manufacturer_details:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)]),
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
validation_list:any;
submitted=false;
base64='data:image/jpeg;base64,';
imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
croppedImage:any;
imageChangedEvent: any = '';
selectItemImageUpload:any;

  ngOnInit(): void {
    this.form.controls['hsn'].disable();

    this.getIPAddress();
let requestFormUrl = 'AddProduct/get_data/';
    this.allapi.GetDataById(requestFormUrl, 1).subscribe(response=>{

      if(response.category_list!="")
      {
          this.uom_weight_list = [];
          this.uom_size_list = [];
          this.category_list = response.category_list;
          this.product_type_list = response.product_type_list;
          this.brand_list = response.brand_list;
          this.uom_list = response.uom_list;
          this.uom_list_temp = response.uom_list;
          this.uom_list_temp.map((ss:any)=>
          {
            if (ss.uomtype == 'Weight') {
              this.uom_weight_list.push(ss);
          }
          else if (ss.uomtype == 'meter') {
              this.uom_size_list.push(ss);
          }
          });
        }

      });

  }

get_sub_category (mcid:any) {
this.base_price="";
  this.sub_category_list=[];
  this.additional_category_list=[];
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
    console.log('subcat',this.form.value.sub_cat.length)
  if(this.form.value.sub_cat.length==0){

    this.form.controls['sub_cat'].setErrors({'required': true})
    //return;
  }
}

get_spl_category(mcid:any, mscid:any) {
  this.base_price="";
  this.additional_category_list=[];
  var data = {
      "category_id": parseInt(mcid),
      "sub_category_id": parseInt(mscid),
      "language_id": 1,
      "ipAddress":this.ipAddress,
      "apitype":"Web"
  }

  let requestFormUrl = 'AddProduct/get_spl_category/';
    this.allapi.PostData(requestFormUrl,data).subscribe(response =>  {
      if (response.additional_category_list != "") {
        this.additional_category_list = response.additional_category_list;
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
//   if (imageInput.files[0].type != "image/jpeg") {
//     Swal.fire({
//       position: 'center',
//       icon: 'warning',
//       title: 'Please Upload the JPEG file',
//       showConfirmButton: false,
//       timer: 3000
//   })
//       return;
//   } else if (imageInput.files[0].size > 2097152) {
//     Swal.fire({
//       position: 'center',
//       icon: 'warning',
//       title: 'Image size should be less than 2MB',
//       showConfirmButton: false,
//       timer: 3000
//   })
//       return;
//   }
//   else if (imageInput.files[0].size < 10000) {
//     Swal.fire({
//       position: 'center',
//       icon: 'warning',
//       title: 'Image size Minimun 10kb',
//       showConfirmButton: false,
//       timer: 3000
//   })
//       return;
//   }
//   this.SelectedFile_Array=imageInput.files[0];
//   formData.append("File", this.SelectedFile_Array);

//  let url='http://49.205.194.238:1300/api/ImageUpload/Product_Image_Upload';

//  return this.http.post(url, formData).subscribe((promise:any)=>
//  {
//     this.p_imageurl=promise.path;

//  })
// }



savedata  () {
  this.submitted = true;
  if(this.form.value.productname_en.trim() ==''){
    this.form.controls['productname_en'].setErrors({'required': true})
  }
  if(this.form.value.short_desc_en.trim() ==''){
    this.form.controls['short_desc_en'].setErrors({'required': true})
  }

  if(this.form.value.baseprice.length < 8){
    this.form.controls['baseprice'].setErrors({'required': true})
  }

  if (this.form.invalid) {
    return;
  }

    this.btn_dissable=false;
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
          "apitype":"Web"
      }

let url='AddProduct/Save_Product/'
      this.allapi.PostData(url, data).subscribe(promise=> {
          if (promise.status == "Update") {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Add Product Saved Successfully.',
                  showConfirmButton: false,
                  timer: 3000
              })
              sessionStorage.setItem('productid', promise.ret_product_id);

              this.router.navigate(["/app/addproductspecification/"+promise.ret_product_id]);

              //window.location.reload();
          }
          else if (promise.status == "Failed") {
              Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Failed To Product Insert',
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
Clear()
{
window.location.reload();
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
