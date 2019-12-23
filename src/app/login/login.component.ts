import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientApi, ILoginRequest, IAuthCredentials, LoginRequest, LoginResponse } from '../shared/services/api/service-proxies';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidPasswordMessage: string;
  invalidPassword = false;

  constructor(
    private api: ClientApi,
    private router: Router,
    private fb: FormBuilder
  ) {}


  ngOnInit() {
    // place logic to redirect if user attempts to hit /login but already logged in redirect to /dashboard

    // init form
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(2) ]],
      password: ['', [ Validators.required, Validators.minLength(8) ]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submitForm() {
    console.log('request');
    this.api.login({
      authCredentials: {
        username: (this.username as FormControl).value,
        password: (this.password as FormControl).value,
      }
    } as LoginRequest)
    .subscribe((resp: LoginResponse) => {
      console.log(resp.message);
      console.log(resp.status);
      console.log(resp.responseData);
      this.router.navigate(['/dashboard']);
    });

    // if(this.authService.invalidPassword){
    //   this.invalidPassword = this.authService.invalidPassword.length > 0;
    //   this.invalidPasswordMessage = this.authService.invalidPassword;
    // }

  }

}
