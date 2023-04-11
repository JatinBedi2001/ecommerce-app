import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
 
  public wishlistItemList: any[] = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() {
    this.loadWishlistItems();
  }

  private loadWishlistItems() {
    const storedItems = localStorage.getItem('wishlistItems');
    if (storedItems) {
      this.wishlistItemList = JSON.parse(storedItems);
      this.productList.next(this.wishlistItemList);
    }
  }

  private saveWishlistItems() {
    localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItemList));
  }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.wishlistItemList.push(...product);
    this.productList.next(this.wishlistItemList);
    this.saveWishlistItems();
  }

  addToWishlist(product: any) {
    const existingItem = this.wishlistItemList.find((item: any) => item.id === product.id);
    if (!existingItem) {
      this.wishlistItemList.push(product);
      this.productList.next(this.wishlistItemList);
      this.saveWishlistItems();
    }
  }

  removeWishlistItem(product: any) {
    this.wishlistItemList = this.wishlistItemList.filter((item: any) => item.id !== product.id);
    this.productList.next(this.wishlistItemList);
    this.saveWishlistItems();
  }
}
