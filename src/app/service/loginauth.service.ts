import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginauthService {
  isLoggedIn: boolean = false;

  constructor() { }

  setLoginStatus(status: boolean) {
    this.isLoggedIn = status;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }
}
