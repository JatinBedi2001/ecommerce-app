import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { LoginauthService } from 'src/app/service/loginauth.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public totalItem: number = 0;
  public WishItem: number = 0;
  public searchTerm: string = '';
  public isLoggedIn: boolean = false;
  cartSubscription!: Subscription;
  productListSubscription!:Subscription;

  constructor(
    private cartService: CartService,
    private wishlistService:WishlistService,
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private loginService: LoginauthService
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });

    this.productListSubscription = this.wishlistService.productList.subscribe((products) => {
      this.WishItem = products.length;
    });

    this.isLoggedIn = this.loginService.getLoginStatus();

    this.auth.isAuthenticated$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.loginService.setLoginStatus(isLoggedIn);
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.productListSubscription) {
      this.productListSubscription.unsubscribe();
    }
  }
}
