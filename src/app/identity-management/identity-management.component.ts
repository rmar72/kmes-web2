import { Component, OnInit } from '@angular/core';
import { Users, ClientApi } from '../shared/services/api/service-proxies';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-identity-management',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss']
})
export class IdentityManagementComponent implements OnInit {
  showFullscreen = false;
  showDetailView = false;
  showCreateGroup = false;
  showCreateIdentity = false;
  identityCount = 0;
  usersGet$ = this.userManagement.usersGet();
  identities$ = new Subject<Users[]>();
  identityCount$ = new Subject<string>();

  constructor(private userManagement: ClientApi) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
      this.userManagement.usersGet().subscribe(resp => {
        this.identities$.next(resp.responseData.users);
        this.identityCount$.next(`(${resp.responseData.totalItems})`);
      });
  }

  toggleCreateGroup(): void {
    this.showCreateGroup = !this.showCreateGroup;
  }

  // clear create group form
  discardCreateGroup(): void {
    this.showCreateGroup = !this.showCreateGroup;
  }

  submitCreateGroup(): void {

  }

  toggleCreateIdentity(): void {
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  // clear create identity form
  discardCreateIdentity(): void {
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  submitCreateIdentity(): void {
  }

  resetForms(): void {
    this.showCreateGroup = false;
    this.showCreateIdentity = false;
  }

  onIdentityDeleted(message: string) {
    console.log(message);
    this.getUsers();
  }
}
