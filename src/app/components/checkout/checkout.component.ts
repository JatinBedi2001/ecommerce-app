import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shippingInfo: any = {};
  grandTotal: number = 0;
  public products: any[] = [];
  paymentHandler: any = null;
  paymentMade = false;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.invokeStripe();

    this.cartSubscription = this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      });
  }

  makePayment() {
    const self = this;
    const amount = this.grandTotal;
    this.paymentMade = true;
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key:
        'pk_test_51MtmVTSJY5C7wp7CDXLbDPAKHk64PcBFzKdEEHnwVgHdwZWIELOwVOlimHg99M1mrjEwMOBJb0INnPy0mAJmlKsX00mTHUXjz4',

      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken.card);
        self.router.navigate(['/thank-you']);
        self.cartService.clearCart();
        setTimeout(() => {
          self.router.navigate(['/']);
        }, 5000);
      },
    });

    paymentHandler.open({
      name: 'My Ecommerce',
      amount: amount * 100,
    });

  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
