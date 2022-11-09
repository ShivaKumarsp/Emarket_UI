import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hub-to-hub-transport-map',
  templateUrl: './hub-to-hub-transport-map.component.html',
  styleUrls: ['./hub-to-hub-transport-map.component.css'],
})
export class HubToHubTransportMapComponent implements OnInit {
  page: any;
  page1: any;
  page2: any;
  submitted = false;
  transport_mode_id ="";
  hub_id ="";
  hubid = 0;
  hub_list: any;
  transportation_list: any;
  city_list: any;
  state_list: any;

  sstate_list: any;
  dstate_list: any
  statelist2:any
  scity_list:any
  dcity_list:any
  sstate_id ="";
  dstate_id ="";
  scity_id = "";
  dcity_id = "";
  pincode_list: any;
  spincode_id ="";
  dpincode_id ="";
  country_list: any;
  search = '';
  pages1: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  hub_transpotation_list: any;
  dhub_list: any;
  dhub_id = 0;
  scountry_id="";
  dcountry_id ="";
  hub_txr_id = 0;
  source_hub_id=0;
  destination_hub_id=0;
  country_id=""
  state_id=""
  city_id=""
  pincode_id=""
  spincode_list:any
  dpincode_list:any
  hub_to_hub_list:any
  hub_to_hub_txr_id=0
  validation_list:any

  pages2: number = 1;
  count2: number = 0;
  tableSize2: number = 10;
  tableSizes2: any = [3, 6, 9, 12];
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private allapi: AllapiService,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    let url = 'hub_to_hub_map/gethub_to_hub/';
    this.allapi.GetDataById(url, 1).subscribe((promise) => {

      this.hub_list = JSON.parse(promise.hub_list).Table;
      this.transportation_list = JSON.parse(promise.transportation_list).Table;

      this.hub_transpotation_list = JSON.parse(
        promise.hub_transpotation_list
      ).Table;

      this.country_list = JSON.parse(promise.country_list).Table;
      this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table

    });
    this.page = 1;
    window.scrollTo(0,0);
  }
  hubtohubtrans = new UntypedFormGroup({
    shub_name: new UntypedFormControl('', [Validators.required]),
    dhub_name: new UntypedFormControl('', [Validators.required]),
    // country: new FormControl('', [Validators.required]),
    // state: new FormControl('', [Validators.required]),
    // city: new FormControl('', [Validators.required]),
    // Pincode: new FormControl('', [Validators.required]),
    // country1: new FormControl('', [Validators.required]),
    // state1: new FormControl('', [Validators.required]),
    // city1: new FormControl('', [Validators.required]),
    // Pincode1: new FormControl('', [Validators.required]),
  });

  hubtrans = new UntypedFormGroup({
    hub_name: new UntypedFormControl('', [Validators.required]),
    transport_mode: new UntypedFormControl('', [Validators.required]),
    // country: new FormControl('', [Validators.required]),
    // state: new FormControl('', [Validators.required]),
    // city: new FormControl('', [Validators.required]),
    // Pincode: new FormControl('', [Validators.required]),
  });
  //get state
  get_state(cid: any) {

    let stdata = {
      language_id: 1,
      country_id: parseInt(cid),
    };

    let sturl = 'hub_to_hub_map/get_state/';
    this.allapi.PostData(sturl, stdata).subscribe((promise) => {
      this.state_list = JSON.parse(promise.state_list).Table;
    });
  }

  get_state1(cid: any) {

    let stdata = {
      language_id: 1,
      country_id: parseInt(cid),
    };

    let sturl = 'hub_to_hub_map/get_state1/';
    this.allapi.PostData(sturl, stdata).subscribe((promise) => {
      this.sstate_list = JSON.parse(promise.state_list).Table;
    });
  }
  get_state2(cid: any) {

    let stdata = {
      language_id: 1,
      country_id: parseInt(cid),
    };

    let sturl = 'hub_to_hub_map/get_state/';
    this.allapi.PostData(sturl, stdata).subscribe((promise) => {
      this.dstate_list = JSON.parse(promise.state_list).Table;
    });
  }

  //get city
  get_city(sid: any) {

    let stdata = {
      language_id: 1,
      state_id: parseInt(sid),
    };

    let sturl = 'hub_to_hub_map/get_city/';
    this.allapi.PostData(sturl, stdata).subscribe((promise) => {
      this.city_list = JSON.parse(promise.city_list).Table;
    });
  }

  //get city
  get_city1(sid: any) {
    console.log('source',sid)
    let stdata = {
      language_id: 1,
      state_id: parseInt(sid),
    };

    let sturl = 'hub_to_hub_map/get_city1/';
    this.allapi.PostData(sturl,stdata).subscribe((promise) => {
      this.scity_list = JSON.parse(promise.city_list).Table;
    });
  }

  //get city
  get_city2(sid: any) {

    let stdata = {
      language_id: 1,
      state_id: parseInt(sid),
    };

    let sturl = 'hub_to_hub_map/get_city/';
    this.allapi.PostData(sturl, stdata).subscribe((promise) => {
      this.dcity_list = JSON.parse(promise.city_list).Table;
    });
  }

  //get pincode
  get_pincode(cid: any) {
    let stdata = {
      language_id: 1,
      city_id: parseInt(cid),
    };

    let sturl = 'hub_to_hub_map/get_pincode/';
    this.allapi.PostData(sturl, stdata).subscribe((promise) => {
      this.pincode_list = JSON.parse(promise.pincode_list).Table;
    });
  }

  //get pincode
  get_pincode1(cid: any) {
    console.log('city id',cid)
    let stdata = {
      language_id: 1,
      city_id: parseInt(cid),
    };

    let sturl = 'hub_to_hub_map/get_pincode1/';
    this.allapi.PostData(sturl, stdata).subscribe((promise) => {
      this.spincode_list = JSON.parse(promise.pincode_list).Table;
    });
  }


  //get pincode
  get_pincode2(cid: any) {
    let stdata = {
      language_id:1,
      city_id:parseInt(cid),
    };

    let sturl = 'hub_to_hub_map/get_pincode/';
    this.allapi.PostData(sturl, stdata).subscribe((promise) => {
      this.dpincode_list = JSON.parse(promise.pincode_list).Table;
    });
  }

  //geget_hub
  get_hub(hid: any) {

    let hdata = {
      language_id:1,
      source_hub_id:parseInt(hid),
    };

    let sturl = 'hub_to_hub_map/get_hub/';
    this.allapi.PostData(sturl, hdata).subscribe((promise) => {
      this.dhub_list = JSON.parse(promise.dhub_list).Table;
    });
  }
  save_hub_transport() {
    this.submitted = true;
    if (this.hubtrans.invalid) {
      return;
    }
    let transdata = {
      hub_txr_id: this.hub_txr_id,
      hub_id: this.hub_id,
      transport_mode_id: this.transport_mode_id,
      // country_id: parseInt(this.country_id),
      // state_id: parseInt(this.state_id),
      // city_id: parseInt(this.city_id),
      // pincode_id: parseInt(this.pincode_id),
    };
    console.log('hub transport',transdata)
    let turl = 'hub_to_hub_map/save_hub_to_hub/';
    this.allapi.PostData(turl, transdata).subscribe((promise) => {
      console.log(promise.status)
      if (promise.status = 'Insert') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (promise.status == 'Validadtion') {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
        this.validation_list=promise.validation_list;
      } else if (promise.status =='Failed') {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
    // this.ngOnInit();
    window.location.reload();
  }
  //delete
  delete_hub_transport(id: any) {

    let deldata = {
      hub_txr_id: id,
    };

    let delurl = 'hub_to_hub_map/delete_hub_transport/';
    this.allapi.PostData(delurl, deldata).subscribe((promise) => {

      if ((promise.status = 'Delete')) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (promise.status == 'Failed') {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
    this.ngOnInit();
    window.location.reload();
  }
  //edit

  edit_hub_transport(e:any)
  {
    // console.log(e)
    this.hub_txr_id=e.hub_txr_id,
    this.hub_id=e.hub_id,
    this.transport_mode_id=e.transport_mode_id,
    this.country_id=e.country_id,
    this.get_state(this.country_id)
    this.state_id=e.state_id,
    this.get_city(this.state_id)
    this.city_id=e.city_id,
    this.get_pincode(this.city_id)
    this.pincode_id=e.pincode_id
    window.scrollTo(0,0);
  }

  //hub to hub

  save_hub_to_hub_transport() {

    this.submitted = true;
    if (this.hubtohubtrans.invalid) {
      return;
    }
    let transdata1 = {
      "hub_to_hub_txr_id":this.hub_to_hub_txr_id,
	    "source_hub_id":this.source_hub_id,
	    "destination_hub_id":this.destination_hub_id,
      // "source_country_id":parseInt(this.scountry_id),
      // "source_state_id":parseInt(this.sstate_id),
      // "source_city_id":parseInt(this.scity_id),
      // "source_pincode_id":parseInt(this.spincode_id),
      // "destination_country_id":parseInt(this.dcountry_id),
      // "destination_state_id":parseInt(this.dstate_id),
      // "destination_city_id":parseInt(this.dcity_id),
      // "destination_pincode_id":parseInt(this.dpincode_id),
    };
    console.log('hub to hub',transdata1)
    let turl = 'hub_to_hub_map/save_hub_to_hub_transpotation/'
    this.allapi.PostData(turl, transdata1).subscribe((promise) => {

      if ((promise.status = 'Insert')) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (promise.status == 'Validadtion') {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
        this.validation_list=promise.validation_list;
      } else if (promise.status == 'Failed') {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
    window.location.reload()
    this.page=2;
  }
  //delete hub to hub transport
  delete_hub_to_hub_transport(hhid: any) {

    let deldata = {
      hub_to_hub_txr_id: hhid,
    };

    let delurl = 'hub_to_hub_map/delete_hub_to_hub_transport/'
    this.allapi.PostData(delurl, deldata).subscribe((promise) => {

      if ((promise.status = 'Delete')) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (promise.status == 'Failed') {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
    window.location.reload();
    this.page=2
  }
//get hub with pincode match
gethubpin(pid:any)
{
  console.log(pid)
}
  //edit hub to hub
  edit_hub_to_hub_transport(e1:any)
  {
    //  console.log('edit',e1)
     this.hub_to_hub_txr_id=e1.hub_to_hub_txr_id,
	   this.source_hub_id=e1.source_hub_id,
	    this.destination_hub_id=e1.destination_hub_id,
      this.scountry_id=e1.source_country_id
     this.get_state1(this.scountry_id)

      this.sstate_id=e1.source_state_id,
      this.get_city1(this.sstate_id)

      this.scity_id=e1.source_city_id,
      this.get_pincode1(this.scity_id)

      this.spincode_id=e1.source_pincode_id,

      this.dcountry_id=e1.destination_country_id,
      this.get_state2(this.dcountry_id)

     this.dstate_id=e1.destination_state_id,
     this.get_city2(this.dstate_id)

      this.dcity_id=e1.destination_city_id,
      this.get_pincode2(this.dcity_id)

      this.get_hub(this.source_hub_id)
     this.dpincode_id=e1.destination_pincode_id
     window.scrollTo(0,0);
  }

  get f() {
    return this.hubtrans.controls;
  }

  get g() {
    return this.hubtohubtrans.controls;
  }

  onTableDataChange(event: any) {
    this.pages1 = event;
    this.ngOnInit();
  }

  onTableDataChange1(event2: any) {
    this.pages2 = event2;
    this.page=2
    this.ngOnInit();
  }
}
