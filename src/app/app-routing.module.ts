import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { HomeGuard } from './guards/home.guard';
import { AuthGuard } from '@auth0/auth0-angular';


const routes: Routes = [
  { path: '', canActivate: [HomeGuard], component: HomeComponent }, 
  { path: 'products', component: ProductsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent,canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent ,canActivate: [AuthGuard]},
  { path: 'thank-you', component:ThankYouComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
