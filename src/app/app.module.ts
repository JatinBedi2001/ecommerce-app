import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { HomeGuard } from './guards/home.guard';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    HomeComponent,
    CartComponent,
    FilterPipe,
    CheckoutComponent,
    ThankYouComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri
      },
      cacheLocation:"localstorage",
    }),
  ],
  providers: [HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
