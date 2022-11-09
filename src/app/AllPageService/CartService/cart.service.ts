import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>(0);
  public search = new BehaviorSubject<string>("");
  
  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  addtoCart(product : any){
    this.cartItemList.push(product);
    //alert(product)
    //alert(this.cartItemList)
    //this.productList.next(this.cartItemList);  
    this.productList.next(product);  
  }

 
  
}
