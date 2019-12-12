import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/home/dashboard']);
    }
   }

  ngOnInit() {
  }

  submitForm(){
    const { username, password } = this.loginForm.controls;

    console.log(username, password)

    this.authService.login(username.value, password.value);

    // REPLACE
    // for now just a means to correct a wrong password
    if(this.loginForm.controls.password.value === "test"){
      this.router.navigate(['/']);
    } else {
      localStorage.removeItem('currentUser');
      this.loginForm.reset();
    }
  }

}
