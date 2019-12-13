import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) {}

  login(username: string, password: string){
    const user: User = { username, password }

    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): Boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if(user){
      return true;
    }
    return false;
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
