import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { IdentityEditComponent } from '../identity-edit/identity-edit.component';

@Component({
  selector: 'app-identity-detail',
  templateUrl: './identity-detail.component.html',
  styleUrls: ['./identity-detail.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class IdentityDetailComponent implements OnInit {
  @ViewChild(IdentityEditComponent, {static: false}) identityEditComponent: IdentityEditComponent;

  @Input() displayIdentity: any;

  showUserEdit = false;

  constructor() {}

  ngOnInit() {}

  editUser() {
    this.showUserEdit = true;
  }

  cancelEdit() {
    this.showUserEdit = false;
  }

  saveEdits() {
    this.identityEditComponent.submitEditIdentity();
  }

}
