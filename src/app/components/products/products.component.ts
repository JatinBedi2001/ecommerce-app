import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { CartService } from "src/app/service/cart.service";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  total: number;
}

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productList$: Observable<Product[]> | undefined;
  searchKey: string = "";
  cartSubscription!: Subscription;

  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productList$ = this.api.getProduct().pipe(
      map((res: any[]) =>
        res.map((a) => ({
          ...a,
          quantity: 1,
          total: a.price,
        }))
      )
    );

    this.cartSubscription = this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
