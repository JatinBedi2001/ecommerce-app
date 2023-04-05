import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
selector: 'app-checkout',
templateUrl: './checkout.component.html',
styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

grandTotal: number = 0;
public products:any=[];

constructor(private cartService: CartService) { }

ngOnInit(): void {
  this.cartService.getProducts()
  .subscribe(res=>{
    this.products=res;
    this.grandTotal=this.cartService.getTotalPrice();
  })
 }

}
