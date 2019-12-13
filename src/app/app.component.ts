import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userSignedIn: Boolean;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSignedIn = this.authService.getCurrentUser();
    if (this.userSignedIn) {
      this.router.navigate(['/dashboard']);
    }
  }
  
  logout(): void{
    this.authService.logout();
    this.userSignedIn = false;
  }

}
