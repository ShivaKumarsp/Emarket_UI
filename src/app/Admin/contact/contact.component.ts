import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { required } from '@rxweb/reactive-form-validators';
import { Editor, NgxEditorModule } from 'ngx-editor';

import { Observable } from 'rxjs';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private allapi:AllapiService) { }

  editor: Editor = new Editor;
  html: '' = "";
  forms = new UntypedFormGroup({  
    firstname: new UntypedFormControl("",[Validators.required]),
    lastname: new UntypedFormControl(),
    vemail: new UntypedFormControl("",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    mob: new UntypedFormControl("",[Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    sub: new UntypedFormControl("",[Validators.required]),
    msg: new UntypedFormControl("",[Validators.required]),

  });

  first_name="";
  last_name="";
  email="";
  mobile="";
  subject="";
  message="";
  submitted=false;

  get f(){
    return this.forms.controls;
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  
  ngOnDestroy(): void {
    this.editor.destroy();
  }
 
  submitData(){
    this.submitted=true;
    if (this.forms.invalid) {
      return;
    }

  var data={
    "first_name":this.first_name.trim(),
    "last_name":this.last_name.trim(),
    "email":this.email,
    "mobile":parseInt(this.mobile),
    "subject":this.subject,
    "mail_message":this.message,
    "language_id":1
  }
  console.log(data)
  let url='Contact/submit_data/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status=="Insert")
      {
        this.submitted = false;
        this.forms.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })   

    }
      else if(promise.status=="Failed")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      }    

    })
    
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

}
NgxEditorModule.forRoot({
  locals: {
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    underline: 'Underline',
    // ...
  },
});



