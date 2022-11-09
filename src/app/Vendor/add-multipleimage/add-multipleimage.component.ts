import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-multipleimage',
  templateUrl: './add-multipleimage.component.html',
  styleUrls: ['./add-multipleimage.component.css']
})
export class AddMultipleimageComponent implements OnInit {

  submitted=false
  itemid:any;
  // sent_img:number=0
  //sucess_img:number=0
  imageDetails:any
    item_image=""
    selectItemImageUpload: any

  loop:any=[]
  constructor(private activateroute:ActivatedRoute,
    private httpclient:HttpClient,
    private fb: UntypedFormBuilder,
    private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

     imageform=new UntypedFormGroup({
      itemimage1: new UntypedFormControl(''),
      itemimage2: new UntypedFormControl(''),
      itemimage3: new UntypedFormControl('')
    })

    base64='data:image/jpeg;base64,';
    imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
    item_image_list:any;
    image_1="";
    image_2="";
    image_3="";
    p_image_1="";
    p_image_2="";
    p_image_3="";
    validation_list:any;

  ngOnInit(): void {
    this.itemid=this.activateroute.snapshot.paramMap.get("itemid");
var data={
  "item_id":parseInt(this.itemid),
  "language_is":1
}
    let imageurl = 'Vendor_Add_Item/get_multiple_images/'
    this.allapi.PostData(imageurl,data).subscribe(promise => {
    this.item_image_list=promise.item_image_list;
    this.p_image_1=this.item_image_list[0].image_url;
    this.p_image_2=this.item_image_list[1].image_url;
    this.p_image_3=this.item_image_list[2].image_url;

    })
  }



  saveimage()
  {
   if(this.p_image_1==""&&this.p_image_2=="" && this.p_image_3=="")
   {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Upload All Images',
      showConfirmButton: false,
      timer: 3000
    })
    return
   }
    let data={
      item_id:parseInt(this.itemid),
      'image_1':this.p_image_1,
      'image_2':this.p_image_2,
      'image_3':this.p_image_3,
    }
    console.log('d',data)
    let imageurl = 'Vendor_Add_Item/save_multiple_images/'
    this.allapi.PostData(imageurl,data).subscribe(promise => {
      this.loop.push(data.item_id)
      if (promise.status == "Save") {
        this.loop.push(data.item_id)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Images Saved Successfully.',
          showConfirmButton: false,
          timer: 3000
        })

        this.item_image_list=promise.item_image_list;
        this.p_image_1=this.item_image_list[0].image_url;
        this.p_image_2=this.item_image_list[1].image_url;
        this.p_image_3=this.item_image_list[2].image_url;
      }
      else if (promise.status == "Failed") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.messageflg,
          showConfirmButton: false,
          timer: 5000
        })
      }
      else if (promise.status == "Validation") {
        this.validation_list = promise.validation_list;
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.messageflg,
          showConfirmButton: false,
          timer: 5000
        })
      }

    })
  
  }


//SelectedFile_Array:any;
VendorImageUpload(imageInput: any, image:any) {
// console.log(imageInput)
  var formData = new FormData();
  const file: File = imageInput.files[0];
  if (imageInput.files[0].type != "image/jpeg") {
    if(image=='image1')
    {
      this.p_image_1 = "";
    }
    else if(image=='image2')
    {
      this.p_image_2 = "";
    }
    else if(image=='image3')
    {
      this.p_image_3 = "";
    }

    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Upload the JPEG file',
      showConfirmButton: false,
      timer: 3000
  })
      return;
  } else if (imageInput.files[0].size > 2097152) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Image size should be less than 2MB',
      showConfirmButton: false,
      timer: 3000
  })
      return;
  }
  else if (imageInput.files[0].size < 10000) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Image size Minimun 10kb',
      showConfirmButton: false,
      timer: 3000
  })
      return;
  }

  this.selectItemImageUpload = imageInput.files[0];
  // console.log(this.selectItemImageUpload)
  formData.append("File", this.selectItemImageUpload);
  //let url = 'http://49.205.194.238:1300/api/ImageUpload/Item_Image_Upload';
  return this.httpclient.post('http://49.205.194.238:1300/api/ImageUpload/Item_Image_Upload', formData).subscribe((promise: any) => {
    if(image=='image1')
    {
      this.p_image_1 = promise.path;
    }
    else if(image=='image2')
    {
      this.p_image_2 = promise.path;
    }
    else if(image=='image3')
    {
      this.p_image_3 = promise.path;
    }
   
    // alert(this.item_image)
    // alert(this.imageDetails)

//     if(this.imageDetails!=undefined)
//     {
//       //console.log(this.imageDetails.length)
//       if(this.imageDetails.length>0)
//       {
//         this.imageDetails.push({image_url:this.item_image})
//       }
//       else
//       {
//         this.imageDetails=[];
//         this.imageDetails.push({image_url:this.item_image})
//       }

//     }
// else{
//   this.imageDetails=[];
//   this.imageDetails.push({image_url:this.item_image})
// }

  })
}

get f()
{
  return this.imageform.controls
}



}
