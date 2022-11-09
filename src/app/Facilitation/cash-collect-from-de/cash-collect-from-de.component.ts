import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cash-collect-from-de',
  templateUrl: './cash-collect-from-de.component.html',
  styleUrls: ['./cash-collect-from-de.component.css']
})
export class CashCollectFromDeComponent implements OnInit {

  
  @ViewChild('printDiv') htmlData!: ElementRef;
  constructor(private httpClient: HttpClient,
    private formBuilder: UntypedFormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
   private spinner:NgxSpinnerService,
  ) { }
   orderGroup = new UntypedFormGroup({
    orderStatus: new UntypedFormControl('',[Validators.required]),
    orderRemark: new UntypedFormControl('',[Validators.required]),
  });
  page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";

  submitted=false;
   formModel: any;
   cash_collect_list:any; 
   collected_amount=0;
   min_dob:any;
 
   datePipe = new DatePipe('en-US');
   
  //validation
  get f(){
    return this.orderGroup.controls;
  }

  ngOnInit(): void {
    this.min_dob=new Date();
    this.spinner.show();

    let url='Cash_Collect/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        
        var amount=0;
        this.cash_collect_list=promise.cash_collect_list;
        this.cash_collect_list.forEach((ss:any) => {
          amount=amount+ss.collected_amount;
        });
        this.collected_amount=amount;

       
      })
      this.spinner.hide();
  }
  
  collect_cash(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Confirm This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Confirm it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
            "delivery_executive_id":parseInt(ss.delivery_executive_id),
            "collect_amount":ss.collected_amount,
            "language_id":1
              
            }
            let url='Cash_Collect/collect_cash/';
            this.allapi.PostData(url, data).subscribe(promise=> {  
              if(promise.status=="Received")
              {
              var amount=0;
              this.cash_collect_list=promise.cash_collect_list;
              this.cash_collect_list.forEach((ss:any) => {
                amount=amount+ss.collected_amount;
              });
              this.collected_amount=amount;
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Amount Received Successfully',
                showConfirmButton: false,
                timer: 3000
            });

            }
            else{
                        Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Failed To Receive Amount',
                        showConfirmButton: false,
                        timer: 3000
                    });
            }
            })
  
        }
    })
  
  };

 
 onTableDataChange(event: any) {
    this.page = event;
   
  }



}

