import { Component, OnInit, ViewChild } from '@angular/core';
import { IdentityCreateComponent } from './identity-create/identity-create.component';

@Component({
  selector: 'app-identity-management',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss']
})
export class IdentityManagementComponent implements OnInit {
  showCreateGroup = false;
  showCreateIdentity = false;

  users: any;

  identityCount: number = 0;

  constructor() { }

  ngOnInit() {
    //get identity count 
    this.identityCount = 3;
  }

  toggleCreateGroup = function() {
    this.showCreateGroup = !this.showCreateGroup;
  }

  discardCreateGroup = function() {
    //clear create group form
    this.showCreateGroup = !this.showCreateGroup;
  }

  submitCreateGroup = function() {

  }

  toggleCreateIdentity = function() {
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  discardCreateIdentity = function() {
    //clear create identity form 
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  submitCreateIdentity = function() {

  }

  resetForms = function() {
    this.showCreateGroup = false; 
    this.showCreateIdentity = false;
  }

}
