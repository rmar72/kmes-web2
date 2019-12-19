import { Injectable } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import {
  LoginRequest
} from '../shared/services/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn: boolean;
  public invalidPassword: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this._isLoggedIn = false;
  }

  login(authBody: LoginRequest){
    this.loginService.loginPost(authBody)
    // this.loginService.mock401Res(authBody)
    .subscribe((res) => {

      // form post-validation, throw backend error
      if(res.status =='Unauthorized'){
        this.invalidPassword = res.data.errorMessage
      } 
      else {
        this._setLogin(res);
      }
    });
  }

  private _setLogin(res): void{
    this.router.navigate(['/dashboard']);
    this._isLoggedIn = res.status === "Success" ?  true : false;
    this.invalidPassword = "";
  }

  isLoggedIn(): boolean{
    return this._isLoggedIn;
  }
}
