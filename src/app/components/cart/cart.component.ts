import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public products: any = [];
  public grandTotal: number = 0;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) {}

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

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptyCart(){
    this.cartService.removeAllCart();
    localStorage.removeItem('cartItems');
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
