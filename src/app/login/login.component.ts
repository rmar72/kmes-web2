import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidPasswordMessage: string;
  invalidPassword: boolean = false;

  constructor(
    private authService: AuthService,
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
    this.authService.login({
      authCredentials: { 
        username: (this.username as FormControl).value,
        password: (this.password as FormControl).value 
      }
    });

    if(this.authService.invalidPassword){
      this.invalidPassword = this.authService.invalidPassword.length > 0;
      this.invalidPasswordMessage = this.authService.invalidPassword;
    }

  }

}
