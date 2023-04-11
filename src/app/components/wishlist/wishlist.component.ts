import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CartService } from "src/app/service/cart.service";
import { WishlistService } from "src/app/service/wishlist.service";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"],
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistItems: Product[] = [];
  private productListSubscription!: Subscription;

  constructor(private wishlistService: WishlistService, private cartService: CartService) {}

  ngOnInit() {
    this.productListSubscription = this.wishlistService.productList.subscribe((products) => {
      this.wishlistItems = products;
    });
  }

  ngOnDestroy(): void {
    this.productListSubscription.unsubscribe();
  }

  removeWishlistItem(item: Product) {
    this.wishlistService.removeWishlistItem(item);
  }

  addToCart(item: Product) {
    this.cartService.addtoCart(item);
    this.wishlistService.removeWishlistItem(item);
  }
}
