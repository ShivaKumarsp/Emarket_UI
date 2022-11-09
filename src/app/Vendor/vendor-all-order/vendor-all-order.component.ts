import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
declare var window: any;

@Component({
  selector: 'app-vendor-all-order',
  templateUrl: './vendor-all-order.component.html',
  styleUrls: ['./vendor-all-order.component.css']
})
export class VendorAllOrderComponent implements OnInit {

  formModel: any;

  constructor() { }

  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("allOrderModal")
    );
    
  }

  
  openModal(a:any){
    this.formModel.show();
  }
  closeModal(){
    this.formModel.hide();
  }
  orderGroup = new UntypedFormGroup({
    cemail: new UntypedFormControl(),
    cpassword: new UntypedFormControl(),
  });

  submitForm(e:any){
 
  }
  submit(){
    alert(JSON.stringify(this.saveform.value));
  }
  saveform=new UntypedFormGroup({
    response : new UntypedFormControl(),
    

  });

}
