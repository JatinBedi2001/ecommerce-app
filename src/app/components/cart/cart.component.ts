import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public products: any = [];
  public grandTotal: number = 0;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    if (localStorage.getItem('cartItems')) {
      this.products = JSON.parse(localStorage.getItem('cartItems') || '{}');
      this.grandTotal = this.cartService.getTotalPrice();
    }
    this.cartSubscription = this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      localStorage.setItem('cartItems', JSON.stringify(res));
    })
  }

  incrementQuantity(item: any) {
    this.cartService.incrementQuantity(item);
  }

  decrementQuantity(item: any) {
    this.cartService.decrementQuantity(item);
  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptyCart(){
    this.cartService.removeAllCart();
    localStorage.removeItem('cartItems');
  }

  moveToWishlist(item: any) {
    this.removeItem(item);
    this.wishlistService.addToWishlist(item);
  }
  

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
