import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identity-management',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss']
})
export class IdentityManagementComponent implements OnInit {

  showCreateGroup: boolean = false;
  showCreateIdentity: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCreateGroup = function() {
    this.showCreateGroup = !this.showCreateGroup;
  }

  toggleCreateIdentity = function() {
    this.showCreateIdentity = !this.showCreateIdentity;
  }
}
