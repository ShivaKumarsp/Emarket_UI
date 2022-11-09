import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fc-cash-collect',
  templateUrl: './fc-cash-collect.component.html',
  styleUrls: ['./fc-cash-collect.component.css']
})
export class FcCashCollectComponent implements OnInit {

  
  @ViewChild('printDiv') htmlData!: ElementRef;
  constructor(private httpClient: HttpClient,
    private formBuilder: UntypedFormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
   private spinner:NgxSpinnerService,
   private toastr: ToastrService
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

    let url='Cash_Collect/get_total_cash/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        var amount=0;
        this.cash_collect_list=promise.total_cash_collect_list;
        this.cash_collect_list.forEach((ss:any) => {
          amount=amount+ss.total_amount;
        });
        this.collected_amount=amount;

        this.spinner.hide();
      })
      this.spinner.hide();
  }

 onTableDataChange(event: any) {
    this.page = event;
   
  }



}

