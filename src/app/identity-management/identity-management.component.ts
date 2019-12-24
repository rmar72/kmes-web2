import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-identity-management',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss']
})
export class IdentityManagementComponent implements OnInit {
  showCreateGroup: boolean = false;
  showCreateIdentity: boolean = false;
  identityCount: number = 0;
  // users: any;

  constructor() { }

  ngOnInit() {
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

  getIdentityCount($event) {
    this.identityCount = $event;
  }
}
