import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identity-management',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss']
})
export class IdentityManagementComponent implements OnInit {

  showFullscreen: boolean = false;
  showDetailView: boolean = false;
  showCreateGroup: boolean = false;
  showCreateIdentity: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  toggleFullscreen(){
    this.showFullscreen = !this.showFullscreen;
    this.showDetailView = !this.showDetailView;
  }

  toggleCreateGroup = function() {
    this.showCreateGroup = !this.showCreateGroup;
  }

  discardCreateGroup = function() {
    
  }

  submitCreateGroup = function() {

  }

  toggleCreateIdentity = function() {
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  discardCreateIdentity = function() {

  }

  submitCreateIdentity = function() {

  }

  resetForms = function() {
    this.showCreateGroup = false; 
    this.showCreateIdentity = false;
  }

}
