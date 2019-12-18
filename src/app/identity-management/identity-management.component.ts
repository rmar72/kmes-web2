import { Component, OnInit, ViewChild } from '@angular/core';
import { IdentityCreateComponent } from './identity-create/identity-create.component';

@Component({
  selector: 'app-identity-management',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss']
})
export class IdentityManagementComponent implements OnInit {
  showCreateGroup: boolean = false;
  showCreateIdentity: boolean = false;
  

  users: any;

  constructor() { }

  ngOnInit() {
  }

  toggleCreateGroup() {
    this.showCreateGroup = !this.showCreateGroup;
  }
  discardCreateGroup() {
  }
  submitCreateGroup() {
  }
  toggleCreateIdentity() {
    this.showCreateIdentity = !this.showCreateIdentity;
  }
  discardCreateIdentity() {
    this.showCreateIdentity = false;
  }

  resetForms() {
    this.showCreateGroup = false;
    this.showCreateIdentity = false;
  }

}
