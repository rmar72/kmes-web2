import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { LogoutService } from 'src/logout';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // redirect to home if already logged in
    // if (this.authService.getCurrentUser()) {
    //   this.router.navigate(['/dashboard']);
    // }
   }

  ngOnInit() {
    this.router.navigate(['/login']);
  }

  submitForm() {
    const { username, password } = this.loginForm.controls;

    this.authService.loginPost({
      authCredentials: { username: (username as FormControl).value, password: (password as FormControl).value }
    }).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
