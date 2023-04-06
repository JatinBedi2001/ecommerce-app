import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  public cardItemList: any[] = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  items: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  constructor() {
    this.loadCartItems();

  }

  private loadCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cardItemList = JSON.parse(storedItems);
      this.productList.next(this.cardItemList);
    }
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cardItemList));
  }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cardItemList.push(...product);
    this.productList.next(product);
    this.saveCartItems();
  }

  addtoCart(product: any) {
    const existingItem = this.cardItemList.find((item: any) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      this.cardItemList.push(product);
    }
    this.productList.next(this.cardItemList);
    this.getTotalPrice();
    console.log(this.cardItemList);
    this.saveCartItems();
  }

  clearCart() {
    this.cardItemList = [];
    this.productList.next([]);
    this.totalPrice.next(0);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cardItemList.forEach((item: any) => {
      grandTotal += item.quantity * item.price;
    });
    return grandTotal;
  }


  removeCartItem(product: any) {
    this.cardItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cardItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cardItemList);
    this.saveCartItems();
  }

  removeAllCart() {
    this.cardItemList = []
    this.productList.next(this.cardItemList);
    this.saveCartItems();
  }
}
