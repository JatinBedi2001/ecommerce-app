import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (localStorage.getItem('cartItems')) {
      this.products = JSON.parse(localStorage.getItem('cartItems') || '{}');
      this.grandTotal = this.cartService.getTotalPrice();
    }
    this.cartService.getProducts().subscribe(res => {
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
}
