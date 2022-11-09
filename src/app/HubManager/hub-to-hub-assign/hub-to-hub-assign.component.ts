
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { ReturnOrderRequestComponent } from 'src/app/Vendor/return-order-request/return-order-request.component';
import Swal from 'sweetalert2';
 declare var window:any;
 import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-hub-to-hub-assign',
  templateUrl: './hub-to-hub-assign.component.html',
  styleUrls: ['./hub-to-hub-assign.component.css']
})
export class HubToHubAssignComponent implements OnInit {
  @ViewChild('invoice') invoiceElement!: ElementRef;
  
 
  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }
    
    form = new UntypedFormGroup({
      deliveryExecutive: new UntypedFormControl(''),
      v_order_by: new UntypedFormControl(''),
      v_ischeck: new UntypedFormControl(''),
    
      route_details:new UntypedFormControl(''),

      selectOpt:new UntypedFormControl(''),
      hubid:new UntypedFormControl(''),
      transportmode:new UntypedFormControl(''),
      vehicleno:new UntypedFormControl(''),
      vehicletype_id:new UntypedFormControl(''),
      fleetmanager_name:new UntypedFormControl(''),
      mob:new UntypedFormControl(''),
      v_email:new UntypedFormControl(''),
      dispatch_date:new UntypedFormControl(''),
      dispatch_time:new UntypedFormControl(''),
      reaching_date:new UntypedFormControl(''),
     reaching_time:new UntypedFormControl(''),
     hubvehicle_id:new UntypedFormControl(''),
     airvehicle_id:new UntypedFormControl(''),
     trainvehicle_id:new UntypedFormControl(''),
     a_ischeck:new UntypedFormControl(''),
     hubid1:new UntypedFormControl(''),
     tfrid:new UntypedFormControl(''),
     hubroute:new UntypedFormControl(''),
    });

    form1 = new UntypedFormGroup({
      deliveryExecutive1: new UntypedFormControl('',[Validators.required]),
      v_order_by1: new UntypedFormControl(''),
      v_ischeck1: new UntypedFormControl(''),
      hubvehicle_id1:new UntypedFormControl(''),
   
    });
    
    showlist=0;
    page: number = 1;
    count: number = 0;
    tableSize: number = 8;
    tableSizes: any = [3, 6, 9, 12];
    search="";
    submitted=false;
    submitted1=false;
   
    hub_vehicle_id1="";
    delivery_executive_id="";
    delivery_executive_id1="";
    route_id="";
    executive_list_dd:any;
    hub_vehicle_list_dd:any
    hub_to_hub_list:any;
    hub_to_hub_list_temp:any;
    hub_transport_route:any;
    hub_area_list:any;
 
    vehicle_type="";
    order_by="";
    formModel: any;
    formModel1: any;
    total_weight=0;
    total_vol_weight=0;
    pickup_volumetric_weight=0;
    count_weight=0;
    count_vol_weight=0;
    hub_vehicle_id="";
    air_vehicle_id="";
    train_vehicle_id="";
    show_weight=false;
    consignment_list:any;
    consignment_receive:any;
    consignmentid1:any;
    templist:any;
    templist1:any;
    hut_to_hub_array:any;
    hut_to_hub_compare_array:any;
    hut_to_hub_array_abc:any;
    hut_to_hub_array_temp:any;
    consignment_fc_hub:any;
    own_vehicle=0;
    batch_print_details:any;
    consignment_hub_fc:any;
    pickup_from_fc_view:any;
    drop_to_fc_view:any;
    hub_to_hub_print_list:any;
    assign_pickup_from_pt_to_hub:any;
    public_vehicle_dd:any;
    hub_vehicle_list_dd_temp:any;
    get_data_list:any;
    pt_to_hub_array:any;
    pt_to_hub_array_temp:any;
    hub_name_list:any;
    hub_name_list_temp:any;
    transport_mode_list:any;
    vehicle_type_list:any;
    transport_vehicle_type_list:any;
    city_id=0;
    hub_id="";
    ret_hub_id=0;
    transport_mode="";
    vehicle_no="";
    vehicle_type_id="";
    fleet_manager_name="";
    mobile="";
    email="";
    expected_dispatch_date="";
    expected_dispatch_time="";
    expected_reaching_date="";
    expected_reaching_time="";
    min_dob:any;
    min_time:any;
    hubtype_id=0;
    hubcity_id=0;
    destination_hub_list:any;
    check_all:any;
    transport_mode_list_temp:any;
    transport_air_vehicle_list:any;
    transport_train_vehicle_list:any;
    public lat="";
    public lng="";

    hub_list:any;
    tfr_mode_list:any;
    hub_route_time_schedule:any;
    hubid="";
    transport_mode_id="";
    consignment_id=0;
    tfrid=0;
    next_hub_id=0;
    edit_route=false;
    hub_route="";
  ngOnInit(): void {
    this.hut_to_hub_array=[];
  this.hut_to_hub_compare_array=[];
    this.min_dob=new Date();
  
    // this.formModel = new window.bootstrap.Modal(
    //   document.getElementById("openformModal")
    // );
    
 
    let url='Assign_Hub_to_Hub/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;  
        this.hub_to_hub_list_temp=JSON.parse(promise.hub_to_hub_list).Table;   
        this.hub_area_list =JSON.parse(promise.hub_area_list).Table; 
        this.hub_name_list =JSON.parse(promise.hub_name_list).Table;
        this.hub_name_list_temp =JSON.parse(promise.hub_name_list).Table;
       
        this.transport_vehicle_type_list =JSON.parse(promise.transport_vehicle_type_list).Table;
        this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
        this.hub_vehicle_list_dd_temp=JSON.parse(promise.hub_vehicle_list_dd).Table;  

        this.executive_list_dd=JSON.parse(promise.executive_list_dd).Table;  
        this.hubtype_id=promise.hub_type_id; 
        this.hubcity_id=promise.hub_city_id;
      
        //this.hub_transport_route=JSON.parse(promise.hub_transport_route).Table; 
        //this.batch_print_details=JSON.parse(promise.batch_print_details).Table;

// Receive Hub to Hub
//this.assign_pickup_from_pt_to_hub=JSON.parse(promise.assign_pickup_from_pt_to_hub).Table;
//this.public_vehicle_dd=JSON.parse(promise.public_vehicle_dd).Table;

// consignment 1
        this.consignment_list = [];
        this.hub_to_hub_list.forEach((dev:any)=> {
            if (this.consignment_list.length === 0) {
              this.consignment_list.push({last_hub_id: dev.last_hub_id,city_id:dev.city_id,city_name:dev.city_name,is_check:dev.is_check});
            } else if (this.consignment_list.length > 0) {
                var intcount = 0;
                this.consignment_list.forEach((emp:any)=> {
                    if (emp.city_id === dev.city_id) {
                        intcount += 1;
                    }
                });
                if (intcount === 0) {
                  this.consignment_list.push({last_hub_id: dev.last_hub_id,city_id:dev.city_id,city_name:dev.city_name,is_check:dev.is_check});
                }
            }
        });
        this.consignment_list.forEach((ddd:any)=> {
          this.templist = [];
          this.hub_to_hub_list.forEach((dd:any)=> {
              if (dd.city_id === ddd.city_id) {
                this.templist.push(dd);
              }
          });
          ddd.hub_details_list = this.templist;
      });


      // consignment 2
    //   this.consignment_receive = [];
    //   this.assign_pickup_from_pt_to_hub.forEach((dev:any)=> {
    //       if (this.consignment_receive.length === 0) {
    //         this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
    //       } else if (this.consignment_receive.length > 0) {
    //           var intcount = 0;
    //           this.consignment_receive.forEach((emp:any)=> {
    //               if (emp.batch_id === dev.batch_id) {
    //                   intcount += 1;
    //               }
    //           });
    //           if (intcount === 0) {
    //             this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
    //           }
    //       }
    //   });
    //   this.consignment_receive.forEach((ddd:any)=> {
    //     this.templist = [];
    //     this.assign_pickup_from_pt_to_hub.forEach((dd:any)=> {
    //         if (dd.batch_id === ddd.batch_id) {
    //           this.templist.push(dd);
    //         }
    //     });
    //     ddd.hub_receive_details = this.templist;
    // });




       })
  }
  get_data()
  {
    this.ret_hub_id=0;
    this.get_data_list=[];
    this.form.value.selectOpt.forEach((wtime:any,i:any) => {    
     this.get_data_list.push({'city_id':parseInt(wtime)})
    });
   if(this.get_data_list.length==1)
   {
    if(this.get_data_list[0].city_id==0)
    {
      this.hub_to_hub_list=this.hub_to_hub_list_temp;
    }
    else{
      this.hub_to_hub_list=[];
      this.hub_to_hub_list_temp.forEach((ss:any)=>
      {
        if(ss.city_id==this.get_data_list[0].city_id)
        {
          this.hub_to_hub_list.push(ss)
        }  
        //----      
      })
      this.hub_area_list.forEach((kk:any)=>{
        if(this.get_data_list[0].city_id==kk.city_id)
        {
         this.ret_hub_id=kk.hub_id;
        }
      })
      
      
    }
   }

   else{
    this.hub_to_hub_list=[];
    this.hub_to_hub_list_temp.forEach((ss:any)=>
    {
      this.get_data_list.forEach((aa:any)=>
      {
        if(ss.city_id==aa.city_id)
        {
          this.hub_to_hub_list.push(ss)
        }   
      })
    })
  }
  this.consignment_list = [];
  this.hub_to_hub_list.forEach((dev:any)=> {
      if (this.consignment_list.length === 0) {
        this.consignment_list.push({last_hub_id: dev.last_hub_id,city_id:dev.city_id,city_name:dev.city_name,is_check:dev.is_check});
      } else if (this.consignment_list.length > 0) {
          var intcount = 0;
          this.consignment_list.forEach((emp:any)=> {
              if (emp.city_id === dev.city_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignment_list.push({last_hub_id: dev.last_hub_id,city_id:dev.city_id,city_name:dev.city_name,is_check:dev.is_check});
          }
      }
  });
  this.consignment_list.forEach((ddd:any)=> {
    this.templist = [];
    this.hub_to_hub_list.forEach((dd:any)=> {
        if (dd.city_id === ddd.city_id) {
          this.templist.push(dd);
        }
    });
    ddd.hub_details_list = this.templist;
});
  }
  edit_hub_data(ss:any)
  {
    console.log(ss)
    this.edit_route=true;
    this.consignment_id=ss.consignment_id;
var data={
  "consignment_id":ss.consignment_id,
  "language_id":1
}
let url='Assign_Hub_to_Hub/get_hub_route_data/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    this.hub_list=JSON.parse(promise.hub_list).Table;


  })
  }
  get_tfr_mode(ss:any)
  {
    this.next_hub_id=ss;
    var data={
      "consignment_id":this.consignment_id,
      "next_hub_id":ss,
      "language_id":1
    }
    let url='Assign_Hub_to_Hub/get_tfr_mode/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
   
        this.tfr_mode_list=JSON.parse(promise.tfr_mode_list).Table;
    
      })
  }

  get_departure_time(ss:any)
  {
this.tfrid=ss;
    var data={
      "transport_mode_id":ss,
      "consignment_id":this.consignment_id,
      "next_hub_id":this.next_hub_id,
      "language_id":1
    }
    let url='Assign_Hub_to_Hub/get_departure_time/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
   
        this.hub_route_time_schedule=JSON.parse(promise.hub_route_time_schedule).Table;
    
      })
  }
  update_route()
  {
    var data={
      "next_hub_id":this.next_hub_id,
      "transport_mode_id":this.tfrid,
      "hub_route_id":parseInt(this.hub_route),
      "consignment_id":this.consignment_id,
      "language_id":1
    }
      let url='Assign_Hub_to_Hub/update_route_data/';
      this.allapi.PostData(url,data).subscribe(promise=>
        {
          this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;  
          this.hub_to_hub_list_temp=JSON.parse(promise.hub_to_hub_list).Table;   
          this.hub_area_list =JSON.parse(promise.hub_area_list).Table; 
          this.hub_name_list =JSON.parse(promise.hub_name_list).Table;
          this.hub_name_list_temp =JSON.parse(promise.hub_name_list).Table;
         
          this.transport_vehicle_type_list =JSON.parse(promise.transport_vehicle_type_list).Table;
          this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
          this.hub_vehicle_list_dd_temp=JSON.parse(promise.hub_vehicle_list_dd).Table;  
  
          this.executive_list_dd=JSON.parse(promise.executive_list_dd).Table;  
          this.hubtype_id=promise.hub_type_id; 
          this.hubcity_id=promise.hub_city_id;
        
          this.edit_route=false;
          this.hub_route="";
          this.transport_mode_id="";
          this.hubid="";
  
  // consignment 1
  this.consignment_list = [];
  this.hub_to_hub_list.forEach((dev:any)=> {
      if (this.consignment_list.length === 0) {
        this.consignment_list.push({last_hub_id: dev.last_hub_id,city_id:dev.city_id,city_name:dev.city_name,is_check:dev.is_check});
      } else if (this.consignment_list.length > 0) {
          var intcount = 0;
          this.consignment_list.forEach((emp:any)=> {
              if (emp.city_id === dev.city_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignment_list.push({last_hub_id: dev.last_hub_id,city_id:dev.city_id,city_name:dev.city_name,is_check:dev.is_check});
          }
      }
  });
  this.consignment_list.forEach((ddd:any)=> {
    this.templist = [];
    this.hub_to_hub_list.forEach((dd:any)=> {
        if (dd.city_id === ddd.city_id) {
          this.templist.push(dd);
        }
    });
    ddd.hub_details_list = this.templist;
});
  
         })
  }
  change_tfr_mode(ss:any)
  {
    this.transport_mode="";
    this.expected_dispatch_time="";
    this.expected_reaching_time="";
    var data={
      "destination_hub_id":parseInt(ss),
      "language_id":1
    }
    let url='Assign_Hub_to_Hub/get_transport_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.transport_mode_list=JSON.parse(promise.transport_mode_list).Table;  
        this.transport_vehicle_type_list=JSON.parse(promise.transport_vehicle_type_list).Table;   
        this.transport_air_vehicle_list=JSON.parse(promise.transport_air_vehicle_list).Table;  
        this.transport_train_vehicle_list=JSON.parse(promise.transport_train_vehicle_list).Table;  
              
       })
console.log(ss)
console.log(this.hut_to_hub_array)
this.hut_to_hub_compare_array=[];
this.hut_to_hub_array.forEach((aa:any)=>
{
  if(ss!=aa.next_hub_id)
  {
    this.hut_to_hub_compare_array.push(aa);
  }
})

  }
  change_consignment_list(ss:any)
  {
    // this.form.controls["hubvehicle_id"].setValidators(null);
    // this.form.controls["hubvehicle_id"].updateValueAndValidity();

    this.hub_vehicle_id="";
    this.vehicle_type="";
    if(ss>0)
    {  
    this.executive_list_dd.forEach((aa:any)=>
    {
    if(aa.delivery_executive_id==ss)
    {   
    this.vehicle_type=aa.vehicle_type;
    if(this.vehicle_type!=null)
    {
      this.show_weight=true;
    }
    else{
      this.show_weight=false;
    }
this.own_vehicle=aa.own_vehicle;
    this.total_weight=aa.max_weight;
    this.total_vol_weight=aa.max_volumetric_weight;
    this.pickup_volumetric_weight=aa.pickup_volumetric_weight;

    // if(this.own_vehicle==0)
    // {
    //   this.form.controls["hubvehicle_id"].setValidators([Validators.required]);
    //   this.form.controls["hubvehicle_id"].updateValueAndValidity();
    // }
    // else{
    //   this.form.controls["hubvehicle_id"].setValidators(null);
    //   this.form.controls["hubvehicle_id"].updateValueAndValidity();
    // }
   }
  })

  //   this.consignment_list_new=[];
  //  this.consignment_list.forEach((ss:any)=>
  //  {
  //    if(ss.volumetric_weight<=this.pickup_volumetric_weight)
  //    {
  //      this.consignment_list_new.push(ss)
  //    }

  //  })
  

}
else{

  // this.consignment_list_new=[];
  //  this.consignment_list.forEach((ss:any)=>
  //  {
  //      this.consignment_list_new.push(ss)
     
  //  })
}


    }

    get_vehicle_details(ss:any)
    {
      
      this.vehicle_no="";
      if(ss!="")
      {
    
        this.hub_vehicle_list_dd.forEach((aa:any)=>
      {
      if(aa.vehicle_type_id==ss)
      {   
      this.vehicle_no=aa.vehicle_reg_number;
     }
    }) 
      
      }
      this.total_weight=0;
      this.total_vol_weight=0;
      this.pickup_volumetric_weight=0;

      this.hub_vehicle_list_dd.forEach((aa:any)=>
      {
      if(aa.vehicle_type_id==ss)
      {   
      
      this.show_weight=true; 
      this.total_weight=aa.max_weight;
      this.total_vol_weight=aa.max_volumetric_weight;
      this.pickup_volumetric_weight=aa.pickup_volumetric_weight;
     }
    })

    }

    get_air_vehicle_details(ss:any)
    {
      
      this.transport_air_vehicle_list.forEach((aa:any)=>
      {
      if(aa.hub_route_id==ss)
      {   
      this.vehicle_no=aa.transport_registration_no;
      this.expected_dispatch_time=aa.departure_time;
      this.expected_reaching_time=aa.reached_time;
     }
    }) 

    }

    change_route_data(ss:any)
    {
  
      if(ss=="")
      {
        ss=0;
      }
   
      var data={
        "route_id":parseInt(ss),
        "language_id":1
      }
      let url='Assign_Hub_to_Hub/get_route_data/';
      this.allapi.PostData(url,data).subscribe(promise=>
        {
          this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;     
           
  // consignment 1
  if(this.hub_to_hub_list==""){
    this.hub_to_hub_list=this.hub_to_hub_list_temp
  }
          this.consignment_list = [];
          this.hub_to_hub_list.forEach((dev:any)=> {
              if (this.consignment_list.length === 0) {
                this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
              } else if (this.consignment_list.length > 0) {
                  var intcount = 0;
                  this.consignment_list.forEach((emp:any)=> {
                      if (emp.last_hub_id === dev.last_hub_id) {
                          intcount += 1;
                      }
                  });
                  if (intcount === 0) {
                    this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
                  }
              }
          });
          this.consignment_list.forEach((ddd:any)=> {
            this.templist = [];
            this.hub_to_hub_list.forEach((dd:any)=> {
                if (dd.last_hub_id === ddd.last_hub_id) {
                  this.templist.push(dd);
                }
            });
            ddd.hub_details_list = this.templist;
        });
      
         })

    }
  

    click_change(ss:any)
    { 
     
      this.edit_route=false;
      this.hut_to_hub_compare_array=[];
      this.hub_id="";
      if(this.hut_to_hub_array!="" && this.hut_to_hub_array!=undefined)
      {
      if(ss.is_check==true)
        {
          this.hut_to_hub_array.push({city_id:ss.city_id,city_name:ss.city_name,last_hub_id:ss.last_hub_id,next_hub_id:ss.next_hub_id,item_name:ss.item_name,consignment_id:ss.consignment_id,consignment_l:ss.consignment_l,consignment_b:ss.consignment_b,consignment_h:ss.consignment_h,weight:ss.weight,next_hub:ss.next_hub})
        }
        else if(ss.is_check==false)
        {       
            this.hut_to_hub_array.forEach((value: { city_id: any; },index: any)=>{
                if(value.city_id==ss.city_id) this.hut_to_hub_array.splice(index,1);
            });
          
        }
       
      }
      else{
        if(ss.is_check==true)
        {
          this.hut_to_hub_array=[];
          this.hut_to_hub_array.push({city_id:ss.city_id,city_name:ss.city_name,last_hub_id:ss.last_hub_id,next_hub_id:ss.next_hub_id,item_name:ss.item_name,consignment_id:ss.consignment_id,consignment_l:ss.consignment_l,consignment_b:ss.consignment_b,consignment_h:ss.consignment_h,weight:ss.weight,next_hub:ss.next_hub})
        }
      }
      
    }

    check_all_data()
    {
     this.check_all=true;
    }

    get_vehicle_data(ss:any)
    {
      this.vehicle_no="";
      // this.form.controls["vehicletype_id"].setValidators(null);
      //this.form.controls["vehicletype_id"].updateValueAndValidity();

      if(ss==3)
      {
    
      //this.form.controls["vehicletype_id"].setValidators([Validators.required]);
      //this.form.controls["vehicletype_id"].updateValueAndValidity();
    }
    else{
     // this.form.controls["vehicletype_id"].setValidators(null);
      //this.form.controls["vehicletype_id"].updateValueAndValidity();
  
      }

    }
    get_vehicle_type(ss:any)
    {
      this.vehicle_no="";
      this.hub_vehicle_list_dd=[];
      this.hub_vehicle_list_dd_temp.forEach((aa:any)=>
      {
        if(ss==aa.vehicle_type_id)
        {
          this.hub_vehicle_list_dd.push(aa);
        }
      })
    }
 
    assign_data()
  {
    this.submitted=true;
    if(this.form.invalid)
    {
      return;
    }
    if(this.hub_to_hub_list!="" && this.hub_to_hub_list!=null && this.hub_to_hub_list.length>0)
    {
    if(this.hut_to_hub_array==""||this.hut_to_hub_array==null)
    {
      Swal.fire({
        position:'center',
         icon:'warning',
         title:'Please Select Atleast One Pickup Checkbox',
         showConfirmButton:false,
         timer:3000
      })
      return;
    }
  }

    this.hut_to_hub_array_abc=[];
    this.hut_to_hub_array.forEach((ss:any)=>
    {
      this.hut_to_hub_array_abc.push({last_hub_id:ss.last_hub_id})
    })
    this.hut_to_hub_array_abc = this.hut_to_hub_array_abc.filter((test:any, index:any, array:any) =>
       index === array.findIndex((findTest:any) =>
          findTest.last_hub_id === test.last_hub_id
       )
    );
    
    this.hut_to_hub_array_temp=[];
    this.hut_to_hub_array.forEach((ss:any)=>
    {
      // this.hut_to_hub_array_temp.push({consignment_id:ss.consignment_id,
      //   tracking_id:ss.tracking_id,last_facilitation_id:ss.last_facilitation_id,last_hub_id:ss.last_hub_id,hub_city:ss.hub_city})

      this.hub_to_hub_list.forEach((aa:any)=>
      {
        if(ss.last_hub_id==aa.last_hub_id)
       {
         this.hut_to_hub_array_temp.push({consignment_id:aa.consignment_id,
      tracking_id:aa.tracking_id,last_facilitation_id:aa.last_facilitation_id,last_hub_id:aa.last_hub_id,hub_city:aa.hub_city,next_hub_id:aa.next_hub_id})
       }
     })
    })

  if(this.vehicle_type_id=="")
  {
    this.vehicle_type_id="0";
  }


var hub_count=0;

// if(this.hut_to_hub_array_abc.length>1)
// {
//   Swal.fire({
//     position:'center',
//      icon:'warning',
//      title:'Destination Hub Is Not Match To The Selected Consignment, Please Select Relavent Consignment Or Select Relavent Destination Hub',
//      showConfirmButton:false,
//      timer:7000
//   })
//   return;
// }
// else{
//   var l_hub_id=0;
//   this.hut_to_hub_array_abc.forEach((ss:any)=>
//   {
//     l_hub_id=ss.last_hub_id;
//   })

// }

// this.destination_hub_list.forEach((ss:any)=>
// {

// })



// if(this.hut_to_hub_array_abc.length>1 && this.hubtype_id>1)
// {
//   Swal.fire({
//     position:'center',
//      icon:'warning',
//      title:'Destination Hub Is Not Match To The Selected Consignment, Please Select Relavent Consignment Or Select Relavent Destination Hub',
//      showConfirmButton:false,
//      timer:7000
//   })
//   return;
// }
console.log(this.hut_to_hub_array_temp)
    var data={
   'hu_to_hub_array':this.hut_to_hub_array_temp,
   //"receive_hub_id":parseInt(this.hub_id),
   //"transport_mode_id":parseInt(this.transport_mode),
    //"vehicle_no":this.vehicle_no,
    //"vehicle_type_id":parseInt(this.vehicle_type_id),
    //"fleet_manager_name":this.fleet_manager_name,
    //"mobile":parseInt(this.mobile),
    //"email":this.email,
    //"expected_dispatch_date":this.expected_dispatch_date,
    //"expected_dispatch_time":this.expected_dispatch_time,
    //"expected_reaching_date":this.expected_reaching_date,
   // "expected_reaching_time":this.expected_reaching_time,
    "delivery_executive_id":0,
    "hub_route_id":0,
    "language_id":1,
   
    }
    let url='Assign_Hub_to_Hub/save_hub_to_hub/';
    this.allapi.PostData(url, data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          Swal.fire({
            position:'center',
             icon:'success',
             title:promise.message,
             showConfirmButton:false,
             timer:3000
          });
          this.transport_mode="";
       
          this.submitted=false;
          this.form.reset();
        
        
          this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;  
          this.hub_to_hub_list_temp=JSON.parse(promise.hub_to_hub_list).Table;   
          this.hub_area_list =JSON.parse(promise.hub_area_list).Table; 
          this.hub_name_list =JSON.parse(promise.hub_name_list).Table;
          this.hub_name_list_temp =JSON.parse(promise.hub_name_list).Table;
    
          this.transport_vehicle_type_list =JSON.parse(promise.transport_vehicle_type_list).Table;
          this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
          this.hub_vehicle_list_dd_temp=JSON.parse(promise.hub_vehicle_list_dd).Table;  
  
          this.executive_list_dd=JSON.parse(promise.executive_list_dd).Table; 
         
          this.hubtype_id=promise.hub_type_id; 
          this.hubcity_id=promise.hub_city_id;

  // consignment 1
  this.consignment_list = [];
        this.hub_to_hub_list.forEach((dev:any)=> {
            if (this.consignment_list.length === 0) {
              this.consignment_list.push({last_hub_id: dev.last_hub_id,city_id:dev.city_id,city_name:dev.city_name,is_check:dev.is_check});
            } 
            else if (this.consignment_list.length > 0) {
                var intcount = 0;
                this.consignment_list.forEach((emp:any)=> {
                    if (emp.city_id === dev.city_id) {
                        intcount += 1;
                    }
                });
                if (intcount === 0) {
                  this.consignment_list.push({last_hub_id: dev.last_hub_id,city_id:dev.city_id,city_name:dev.city_name,is_check:dev.is_check});
                }
            }
        });
        this.consignment_list.forEach((ddd:any)=> {
          this.templist = [];
          this.hub_to_hub_list.forEach((dd:any)=> {
              if (dd.city_id === ddd.city_id) {
                this.templist.push(dd);
              }
          });
          ddd.hub_details_list = this.templist;
      });
  
  // consignment 2
//   this.consignment_receive = [];
//   this.assign_pickup_from_pt_to_hub.forEach((dev:any)=> {
//       if (this.consignment_receive.length === 0) {
//         this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
//       } else if (this.consignment_receive.length > 0) {
//           var intcount = 0;
//           this.consignment_receive.forEach((emp:any)=> {
//               if (emp.batch_id === dev.batch_id) {
//                   intcount += 1;
//               }
//           });
//           if (intcount === 0) {
//             this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
//           }
//       }
//   });
//   this.consignment_receive.forEach((ddd:any)=> {
//     this.templist = [];
//     this.assign_pickup_from_pt_to_hub.forEach((dd:any)=> {
//         if (dd.batch_id === ddd.batch_id) {
//           this.templist.push(dd);
//         }
//     });
//     ddd.hub_receive_details = this.templist;
// });



        }
        if(promise.status=="Failed")
        {
           Swal.fire({
            position:'center',
             icon:'warning',
             title:promise.message,
             showConfirmButton:false,
             timer:3000
          });
        }
      })
  }
  reset()
  {
    this.transport_mode="";       
    this.submitted=false;
    this.form.reset();
  }
  change_reaching_date()
  {
    this.expected_reaching_date="";

  }
  // Second Section

  change_consignment_list_two(ss:any)
  {
    this.form1.controls["hubvehicle_id1"].setValidators(null);
    this.form1.controls["hubvehicle_id1"].updateValueAndValidity();

    this.hub_vehicle_id="";
    this.vehicle_type="";
    if(ss>0)
    {  
    this.executive_list_dd.forEach((aa:any)=>
    {
    if(aa.delivery_executive_id==ss)
    {   
    this.vehicle_type=aa.vehicle_type;
    if(this.vehicle_type!=null)
    {
      this.show_weight=true;
    }
    else{
      this.show_weight=false;
    }
this.own_vehicle=aa.own_vehicle;
    this.total_weight=aa.max_weight;
    this.total_vol_weight=aa.max_volumetric_weight;
    this.pickup_volumetric_weight=aa.pickup_volumetric_weight;

    if(this.own_vehicle==0)
    {
      this.form1.controls["hubvehicle_id1"].setValidators([Validators.required]);
      this.form1.controls["hubvehicle_id1"].updateValueAndValidity();
    }
    else{
      this.form1.controls["hubvehicle_id1"].setValidators(null);
      this.form1.controls["hubvehicle_id1"].updateValueAndValidity();
    }
   }
  })

  //   this.consignment_list_new=[];
  //  this.consignment_list.forEach((ss:any)=>
  //  {
  //    if(ss.volumetric_weight<=this.pickup_volumetric_weight)
  //    {
  //      this.consignment_list_new.push(ss)
  //    }

  //  })
  

}
else{

  // this.consignment_list_new=[];
  //  this.consignment_list.forEach((ss:any)=>
  //  {
  //      this.consignment_list_new.push(ss)
     
  //  })
}


    }

    get_vehicle_details_two(ss:any)
    {
      this.total_weight=0;
      this.total_vol_weight=0;
      this.pickup_volumetric_weight=0;

      this.hub_vehicle_list_dd.forEach((aa:any)=>
      {
      if(aa.hub_vehicle_id==ss)
      {   
      
      this.show_weight=true; 
      this.total_weight=aa.max_weight;
      this.total_vol_weight=aa.max_volumetric_weight;
      this.pickup_volumetric_weight=aa.pickup_volumetric_weight;
     }
    })

    }

  click_change_two(ss:any)
  {  
    if(this.pt_to_hub_array!="" && this.pt_to_hub_array!=undefined)
    {
    if(ss.is_check==true)
      {
        this.pt_to_hub_array.push({batch_id:ss.batch_id})
      }
      else if(ss.is_check==false)
      {       
          this.pt_to_hub_array.forEach((value: { batch_id: any; },index: any)=>{
              if(value.batch_id==ss.batch_id) this.pt_to_hub_array.splice(index,1);
          });
        
      }
     
    }
    else{
      if(ss.is_check==true)
      {
        this.pt_to_hub_array=[];
        this.pt_to_hub_array.push({batch_id:ss.batch_id})
      }
    }
    
  }

  assign_pickpfrom_pt()
  {
    this.submitted1=true;
    if(this.form1.invalid)
    {
      return;
    }
    if(this.consignment_receive!="" && this.consignment_receive!=null && this.consignment_receive.length>0)
    {
    if(this.pt_to_hub_array==""||this.pt_to_hub_array==null)
    {
      Swal.fire({
        position:'center',
         icon:'warning',
         title:'Please Select Atleast One Pickup Checkbox',
         showConfirmButton:false,
         timer:3000
      })
      return;
    }
  }


if(this.pt_to_hub_array!=undefined && this.pt_to_hub_array!="" && this.pt_to_hub_array!=null)
{
    this.pt_to_hub_array_temp=[];
    this.pt_to_hub_array.forEach((one:any)=>
    {
      this.assign_pickup_from_pt_to_hub.forEach((two:any)=>
    {
      if(one.batch_id==two.batch_id)
      {
        this.pt_to_hub_array_temp.push({consignment_id:two.consignment_id, batch_id:two.batch_id})
      }
    })
    })
  }



  if(this.hub_vehicle_id1=="")
  {
    this.hub_vehicle_id1="0";
  }

    var data={
'pt_to_hub_array':this.pt_to_hub_array_temp,
"delivery_executive_id":parseInt(this.delivery_executive_id1),
"hub_vehicle_id":parseInt(this.hub_vehicle_id1),
"language_id":1
    }
    let url='Assign_Hub_to_Hub/assign_pickup_from_pt_to_hub/';
    this.allapi.PostData(url, data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          Swal.fire({
            position:'center',
             icon:'success',
             title:promise.message,
             showConfirmButton:false,
             timer:3000
          });
          this.delivery_executive_id="";
          this.delivery_executive_id1="";
          this.submitted1=false;
          this.form1.reset();
       
      
          this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;   
          this.hub_to_hub_list_temp =JSON.parse(promise.hub_to_hub_list).Table;   
          this.executive_list_dd=JSON.parse(promise.executive_list_dd).Table;  
          this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
          this.hub_transport_route=JSON.parse(promise.hub_transport_route).Table; 
          this.batch_print_details=JSON.parse(promise.batch_print_details).Table;
     // Receive Hub to Hub
         this.assign_pickup_from_pt_to_hub=JSON.parse(promise.assign_pickup_from_pt_to_hub).Table;
  
  // consignment 1
  this.consignment_list = [];
  this.hub_to_hub_list.forEach((dev:any)=> {
      if (this.consignment_list.length === 0) {
        this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
      } else if (this.consignment_list.length > 0) {
          var intcount = 0;
          this.consignment_list.forEach((emp:any)=> {
              if (emp.last_hub_id === dev.last_hub_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
          }
      }
  });
  this.consignment_list.forEach((ddd:any)=> {
    this.templist = [];
    this.hub_to_hub_list.forEach((dd:any)=> {
        if (dd.last_hub_id === ddd.last_hub_id) {
          this.templist.push(dd);
        }
    });
    ddd.hub_details_list = this.templist;
});
  
  // consignment 2
  this.consignment_receive = [];
  this.assign_pickup_from_pt_to_hub.forEach((dev:any)=> {
      if (this.consignment_receive.length === 0) {
        this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
      } else if (this.consignment_receive.length > 0) {
          var intcount = 0;
          this.consignment_receive.forEach((emp:any)=> {
              if (emp.batch_id === dev.batch_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
          }
      }
  });
  this.consignment_receive.forEach((ddd:any)=> {
    this.templist = [];
    this.assign_pickup_from_pt_to_hub.forEach((dd:any)=> {
        if (dd.batch_id === ddd.batch_id) {
          this.templist.push(dd);
        }
    });
    ddd.hub_receive_details = this.templist;
});

 



        }
        if(promise.status=="Failed")
        {
           Swal.fire({
            position:'center',
             icon:'warning',
             title:promise.message,
             showConfirmButton:false,
             timer:3000
          });
        }
      })
  }

  view_data(ss: any) {
   
   
    var data = {
      "batch_id":ss.batch_id,
      "language_id": 1,
    };
    let url = 'Assign_Hub_to_Hub/hub_to_hub_print_data/';
    this.allapi.PostData(url, data).subscribe((promise) => {
      this.hub_to_hub_print_list=JSON.parse(promise.hub_to_hub_print_list).Table;
      if (this.hub_to_hub_print_list != '') {
        
        this.formModel.show();
      }
    });
  }
lable_print()
{
  html2canvas(this.invoiceElement.nativeElement, { scale: 1 }).then(
    (canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight =
        (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.addImage(
        imageGeneratedFromTemplate,
        'PNG',
        0,
        5,
        fileWidth,
        generatedImageHeight
      );
      PDF.html(this.invoiceElement.nativeElement.innerHTML);
      PDF.save('download.pdf');

    }
  );
}

change_consignment(ss:any)
{
  this.showlist=ss;
}

  onTableDataChange(event: any) {
    this.page = event;
  
  }


  //validation
  get f(){
    return this.form.controls;
  }
  get g(){
    return this.form1.controls;
  }

}

