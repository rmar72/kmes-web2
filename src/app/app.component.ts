import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { Router } from '@angular/router';
import { LogoutService } from 'src/logout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userSignedIn: boolean;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private logoutService: LogoutService
  ) { }

  ngOnInit() {
    // this.userSignedIn = this.authService.getCurrentUser();
    // if (this.userSignedIn) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  logout(): void {
    // this.logoutService.logoutGet().subscribe(() => {
    //   this.router.navigate(['/login']);
    // });
    // this.authService.logout();
    // this.userSignedIn = false;
  }

}
