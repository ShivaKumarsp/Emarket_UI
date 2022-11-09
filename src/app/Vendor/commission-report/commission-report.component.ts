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

@Component({
  selector: 'app-commission-report',
  templateUrl: './commission-report.component.html',
  styleUrls: ['./commission-report.component.css']
})
export class CommissionReportComponent implements OnInit {

 
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
   commission_list:any; 

   cancel_item_id=0;
   order_item_id=0;
   order_id=0;
   item_id=0;
   cancel_request_status="";
   cancel_request_reasion="";
   accept_order_count:any;
   reject_order_count:any;
   payment_method="";
   delivery_charge="";
   discount_amount="";
   tax_amount="";
   total_order_amount="";
   gross_amount="";
   payable_amount="";
   payment_status="";
   transaction_id="";
   fromdate="";
   todate="";
   min_dob:any;
   getdata=new UntypedFormGroup({
    v_fromdate:new UntypedFormControl('',[Validators.required]),
    v_todate:new UntypedFormControl('',[Validators.required])
   })
   datePipe = new DatePipe('en-US');
   
  //validation
  get f(){
    return this.orderGroup.controls;
  }
  get g(){
    return this.getdata.controls;
  }
  ngOnInit(): void {
    this.min_dob=new Date();
    this.spinner.show();
  

    let url='Commission_Report/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.commission_list=JSON.parse(promise.commission_list).Table;
        this.spinner.hide();
      })
      this.spinner.hide();
  }

  get_data() {
    this.submitted=true;
   if(this.getdata.invalid)
   {
    return
   }
   var s_fromdate = this.datePipe.transform(this.fromdate, 'MM-dd-yyyy');
   var s_todate = this.datePipe.transform(this.todate, 'MM-dd-yyyy');
    this.spinner.show();
   var data={
    "from_date":this.fromdate,
    "to_date":this.todate,
    "language_id":1
   }
    let url='Commission_Report/get_commission_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.commission_list=JSON.parse(promise.commission_list).Table;
        this.spinner.hide();
      })
      this.spinner.hide();
  }
  clear()
  {
    this.ngOnInit();
    this.submitted=false;
   this.getdata.reset();
  }
  change_todate()
  {
    this.todate="";
  }

  printPage(){
    let DATA: any = document.getElementById('printDiv');
    console.log(DATA)
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }



  closeModal(){
    this.formModel.hide(); 
  }

 onTableDataChange(event: any) {
    this.page = event;
   
  }



}

