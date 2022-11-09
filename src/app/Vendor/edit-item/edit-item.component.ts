import { formatDate, NgPlural } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { trim } from '@rxweb/reactive-form-validators';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {


  form: UntypedFormGroup;
    router: any;
    pdetails: boolean = false;
    producttypelist: any;
    countrylist: any;
    storelist: any;
     warrantytypelist: any;
     currencylist: any;
     productlist: any;
     submitted: boolean = false;
     check_durability: boolean = false;

     base64="data:image/jpeg;base64,";
     imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
     In_the_box=""
     durability_uom = "";
     durability ="";
     product_id ="";
     item_type_id ="";
     store_id = "";
     country_origin_id = "";
     warranty_uom_id="";
     mrp = "";
     listing_price = "";
     min_quantity ="";
     currency_id = "";
     warranty = "";
     expiry_date: any;
     dub_show=false;
     item_id:any;
     item_code="";
     item_name ="";
     sku ="";
     manufacture_date:any;
     manufacture_details ="";
     p_imageurl ="";
     quantity = "";
     imagepath ="";
     selectedFile: any;
    selectItemImageUpload:any;
    item_list:any
    edit_item_list:any
    format = 'yyyy-MM-dd';
    locale = 'en-US';
    base_price=0;
    product_details:any;
    validation_list:any;
     itempat="[a-zA-Z][a-zA-Z ]{4,}";
     mrppat="^[+]?[0-9]+([.][0-9]+)?$";
     qtypat="^[+]?[0-9]+([.][0-9]+)?$"
     ship_type=""
     shippingtypelist:any
    //  radioButtonValues : Array<any> = [];
    imageChangedEvent: any = '';
    croppedImage:any;
    hsn_code="";
    gst_percentage="";

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
    private spinner:NgxSpinnerService) {
    this.form = formBuilder.group({
      v_productid:new UntypedFormControl('', [Validators.required]),
      v_item_type:new UntypedFormControl('',[Validators.required]),
      v_itemname:new UntypedFormControl('',[Validators.required,Validators.minLength(5)]),
      v_storename: new UntypedFormControl('',[Validators.required]),
      v_item_mrp: new UntypedFormControl('',[Validators.required,Validators.min(1)]),
      v_item_list_price:new UntypedFormControl('',[Validators.required,Validators.min(1)]),
      v_currencyid:new UntypedFormControl('',[Validators.required]),
      v_quantity:new UntypedFormControl('',[Validators.required,Validators.min(1)]),
      v_min_quantity:new UntypedFormControl('',[Validators.required,Validators.min(1)]),
      v_sku_id:new UntypedFormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      v_checkdurability: new UntypedFormControl(),
      v_durability_duration:new UntypedFormControl(),
      v_durableumo: new UntypedFormControl(),
      v_inthebox: new UntypedFormControl(),
      v_manufacturer_details: new UntypedFormControl(),
      v_manufacturing_date:new UntypedFormControl(),
      v_product_expiry:new UntypedFormControl(),
      v_country:new UntypedFormControl(),
      v_product_warrent:new UntypedFormControl(),
      v_warrantyumo:new UntypedFormControl(),
      v_imagepic:new UntypedFormControl(),
      shiptype:new UntypedFormControl('',[Validators.required]),
      hsn:new UntypedFormControl(''),
      gst:new UntypedFormControl('')
    });
   }

   ngOnInit(): void {
    this.form.controls['hsn'].disable();
    this.form.controls['gst'].disable();
    this.spinner.show();

    this.item_id=this.activateroute.snapshot.paramMap.get("itemid");

    var data = {
      "language_id": 1,
      "item_id": parseInt(this.item_id)
  }
  let requestFormUrl = 'All_Item/get_edit_data/';
  this.allapi.PostData(requestFormUrl,data).subscribe(promise => {
      if (promise.edit_item_list != "") {
        this.edit_item_list = promise.edit_item_list;
        this.item_code =this.edit_item_list[0].itemcode;
        this.item_type_id  =this.edit_item_list[0].itemtype_id ;
        this.product_id   =this.edit_item_list[0].productid;
        this.expiry_date   =this.edit_item_list[0].expirydate;
        this.manufacture_details   =this.edit_item_list[0].manufacturedetails;
        this.country_origin_id   =this.edit_item_list[0].countryorigin_id;
        this.warranty_uom_id   =this.edit_item_list[0].warrantyuom_id;
        this.warranty   =this.edit_item_list[0].v_warranty;
        this.mrp   =this.edit_item_list[0].v_mrp;
        this.listing_price   =this.edit_item_list[0].listingprice;
        this.min_quantity   =this.edit_item_list[0].minquantity;
        this.store_id   =this.edit_item_list[0].storeid;
        this.durability    =this.edit_item_list[0].v_durability;
        this.check_durability=this.edit_item_list[0].checkdurability;

        this.dub_show=this.check_durability;
        this.item_name    =this.edit_item_list[0].itemname;
        this.p_imageurl   =this.edit_item_list[0].itemimage;
          this.quantity    =this.edit_item_list[0].v_quantity;
        this.currency_id=this.edit_item_list[0].currencyid;
        this.In_the_box=this.edit_item_list[0].inthe_box;
        this.sku=this.edit_item_list[0].v_sku;
        this.form.patchValue({
          v_manufacturing_date: formatDate(this.edit_item_list[0].manufacturedate, this.format, this.locale)
          });
        const str = String(this.edit_item_list[0].shippingtype);
        this.ship_type=str


     }


     if(promise.producttypelist!="")
     {   this.product_details=JSON.parse(promise.product_details).Table;
      this.base_price=this.product_details[0].baseprice;
      this.hsn_code=this.product_details[0].hsn_code;
      this.gst_percentage=this.product_details[0].gst_percentage;

         this.producttypelist = promise.producttypelist;
         this.countrylist = promise.countrylist;
         this.productlist = promise.productlist;
         this.storelist = promise.storelist;
         this.warrantytypelist = promise.warrantytypelist;
         this.currencylist = promise.currencylist;
         this.shippingtypelist=JSON.parse(promise.shippingtypelist).Table;

     }

  })
  this.spinner.hide();
}


//get radio button value 15-09-2022
getselcted(id:any)
{
  console.log('get select',id)
}
   get v_item_mrp() {
    return this.form.get('v_item_mrp')!;
  }
  get v_item_list_price() {
    return this.form.get('v_item_list_price')!;
  }
  get v_quantity() {
    return this.form.get('v_quantity')!;
  }
  get v_min_quantity() {
    return this.form.get('v_min_quantity')!;
  }
  get v_itemname() {
    return this.form.get('v_itemname')!;
  }

  keyPressSpace(event:any) {
    if(event.target.selectionStart===0 && event.code==='Space')
    {
      event.preventDefault();
    }
  }

  keyPressSpace_1(event:any) {
    if(event.code==='Space')
    {
      event.preventDefault();
    }
  }


   get f(){
    return this.form.controls;
  }
  keyPressname(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    // (/[a-zA-Z0-9-_ ]/.test(inp))
    if (/[a-zA-Z-_0-9 ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  get v_durability_duration() {
    return this.form.get('v_durability_duration')!;
  }
  checkdub()
  {    this.submitted=false;
    this.dub_show=this.check_durability;
    if(this.dub_show==true)
    {
     this.form.controls["v_durableumo"].setValidators([Validators.required]);
     this.form.controls["v_durableumo"].updateValueAndValidity();
     this.form.controls["v_durability_duration"].setValidators([Validators.required,Validators.min(1)]);
     this.form.controls["v_durability_duration"].updateValueAndValidity();
    }
    else if(this.dub_show==false)
    {
     this.form.controls["v_durableumo"].setValidators(null);
     this.form.controls["v_durableumo"].updateValueAndValidity();
     this.form.controls["v_durability_duration"].setValidators(null);
     this.form.controls["v_durability_duration"].updateValueAndValidity();
    }
  }
  editForm(){
    // console.log(this.form)
    if(this.form.value.v_itemname.trim().length<5){
      this.form.controls['v_itemname'].setErrors({'minlength': true})
    }
    // if(this.form.value.v_sku_id.trim().length<3){
    //   this.form.controls['v_sku_id'].setErrors({'minlength': true})
    // }

    this.submitted=true;
    if(this.form.invalid)
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Enter All Mandatory Fields',
        showConfirmButton: false,
        timer: 3000
      })
      return
    }
    if(this.listing_price>this.mrp)
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Listing Price Should be Less Or Equal To MRP',
        showConfirmButton: false,
        timer: 3000
      })
      return;
    }
    if(this.check_durability==true)
    {
      if(this.durability=="" ||this.durability=="0")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Enter Durable Till',
          showConfirmButton: false,
          timer: 3000
        })
        return
      }
      if(this.durability_uom=="")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Select Durable Type',
          showConfirmButton: false,
          timer: 3000
        })
        return
      }
    }
    if(this.check_durability==false)
    {
      this.durability_uom="0";

    }

    if(this.country_origin_id=="" ||this.country_origin_id=="0"||this.country_origin_id==null)
    {
      this.country_origin_id="0";
    }
    if(this.warranty_uom_id=="" ||this.warranty_uom_id=="0"||this.warranty_uom_id==null)
    {
      this.warranty_uom_id="0";
    }
    if(this.warranty=="" ||this.warranty=="0"||this.warranty==null)
    {
      this.warranty="0";
    }
    if(this.manufacture_date=="" ||this.manufacture_date=="0"||this.manufacture_date==null)
    {
      this.manufacture_date="0001-01-01T00:00:00"
    }

  var ss=this.item_name.trim();

     this.spinner.show();
    let itemcode=this.item_name;

    let sid=1;
    if(this.In_the_box==null)
    {
      this.In_the_box="";
    }
    if(parseInt(this.mrp)>this.base_price)
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'MRP Is Less Or Equal To Base Price',
        showConfirmButton: false,
        timer: 3000
      })
      this.spinner.hide();
      return
    }
    var data =
    {
        "item_id": parseInt(this.item_id),
        "item_name": this.item_name.trim(),
        "item_code":itemcode.trim(),
        "sku": this.sku.trim().toUpperCase(),
        "item_type_id":parseInt(this.item_type_id),
        "currency_id": parseInt(this.currency_id),
        "product_id": parseInt(this.product_id),
        "expiry_date": this.expiry_date,
        "manufacture_date": this.manufacture_date,
        "manufacture_details": this.manufacture_details.trim(),
        "country_origin_id": parseInt(this.country_origin_id),
        "warranty_uom_id": parseInt(this.warranty_uom_id),
        "warranty": parseInt(this.warranty),
        "mrp": parseInt(this.mrp),
        "listing_price":parseInt(this.listing_price),
        "min_quantity": parseInt(this.min_quantity),
        "store_id": parseInt(this.store_id),
        "durability_umo": parseInt(this.durability_uom),
        "durability": parseInt(this.durability),
        "check_durability": this.check_durability,
        "language_id": sid,
        "item_image": this.p_imageurl,
        "quantity": parseInt(this.quantity),
        "In_the_box":this.In_the_box.trim(),
        "shipping_type":parseInt(this.form.value.shiptype),
    }

    // console.log(data)
    let url2 = 'Vendor_Add_Item/saveproductitem/'
    this.allapi.PostData(url2,data).subscribe(promise => {

        if (promise.status == 'Insert') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Item Updatred Successfully.',
                showConfirmButton: false,
                timer: 3000
            })
            this.spinner.hide();
            window.location.replace("/app/additemspecification/" + promise.ret_item_id);
         //this.router.navigate(["/app/additemspecification/" + promise.ret_item_id]);

        }
        else if (promise.status == "Validation") {

            this.validation_list=promise.validation_list;
             this.spinner.hide();

        }
        else if(promise.status == "Failed") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: promise.message,
                showConfirmButton: false,
                timer: 5000
            })
            this.spinner.hide();
        }

    })
    this.spinner.hide();
  };

  nextForm(){

    window.location.replace("/app/additemspecification/" + this.item_id);
  };

  showItem:boolean=false;
  bindThis:any;

  getimg(ss:any) {
  var data={
    "product_id":parseInt(ss),
    "language_id":1
  }
  let url = 'Vendor_Add_Item/get_item_product_details/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      this.product_details=JSON.parse(promise.product_details).Table;
      this.base_price=this.product_details[0].baseprice;
      this.hsn_code=this.product_details[0].hsn_code;
      this.gst_percentage=this.product_details[0].gst_percentage;
    })

  }

  ItemImageUpload(event: any): void {
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
          let url = 'http://49.205.194.238:1300/api/ImageUpload/Item_Image_Upload';
          return this.http.post('http://49.205.194.238:1300/api/ImageUpload/Item_Image_Upload', formData).subscribe((promise: any) => {
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

  // ItemImageUpload(imageInput: any) {
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
  //  this.selectItemImageUpload=imageInput.files[0];
  //  formData.append("File", this.selectItemImageUpload);
  //  let url='http://49.205.194.238:1300/api/ImageUpload/Item_Image_Upload';

  //  return this.http.post(url, formData).subscribe((promise:any)=>
  //  {
  //     this.p_imageurl=promise.path;

  //  })
  // }
  clear()
  {

  }

}

