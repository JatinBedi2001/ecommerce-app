import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public totalItem :number=0;
  public searchTerm:string='';
  constructor(private cartService:CartService,public authService: AuthService){}

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
    this.totalItem=res.length;
    })
  }
  search(event:any){
  this.searchTerm=(event.target as HTMLInputElement).value;
  this.cartService.search.next(this.searchTerm);
  }

  loginWithRedirect() :void {
    this.authService.loginWithRedirect();
  }
  logout(): void {
    this.authService.logout();
  }
}
