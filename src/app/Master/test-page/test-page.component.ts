import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  
  constructor(private http: HttpClient) { }
  selectItemImageUpload: any;
  ngOnInit(): void {

  }

  imageChangedEvent: any = '';
    croppedImage: any = '';

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
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
    check(){

        let newfile = this.dataURLtoFile(this.croppedImage,'file.jpg');
        const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(newfile);
            elem.download = 'newfile.jpg';
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
            console.log(newfile);
            
        var formData = new FormData();
      
        this.selectItemImageUpload = newfile;
        formData.append("File", this.selectItemImageUpload);
        let url = 'http://49.205.194.238:1300/api/ImageUpload/Profile_Upload';
        return this.http.post('http://49.205.194.238:1300/api/ImageUpload/Profile_Upload', formData).subscribe((promise: any) => {
         var p_imageurl = promise.path;
         alert(p_imageurl)
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




}


//   constructor( private http: HttpClient,) { }
//   selectItemImageUpload: any;
//   ngOnInit(): void {

//   }

//   imageChangedEvent: any = '';
//     croppedImage: any = '';

//     fileChangeEvent(event: any): void {
     
//         this.imageChangedEvent = event;
    
//     }
//     imageCropped(event: ImageCroppedEvent) {
//         this.croppedImage = event.base64;
//        var ss= new File([new Blob([this.croppedImage], {type: 'image/jpeg'})],"Imagename.jpg",  {type: 'image/jpeg'});
    
//         var formData = new FormData();
      
//         this.selectItemImageUpload = ss;
//         formData.append("File", this.selectItemImageUpload);
//         let url = 'http://49.205.194.238:1300/api/ImageUpload/Profile_Upload';
//         return this.http.post('http://49.205.194.238:1300/api/ImageUpload/Profile_Upload', formData).subscribe((promise: any) => {
//          var p_imageurl = promise.path;
//          alert(p_imageurl)
//         })
      

//        alert(ss)
//     }
//     imageLoaded(image: LoadedImage) {
//       // show cropper
//   }
//     cropperReady() {
//         // cropper ready
//     }
//     loadImageFailed() {
//         // show message
//     }

// }
