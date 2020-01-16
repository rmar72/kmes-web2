import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { IdentityEditComponent } from '../identity-edit/identity-edit.component';
import {
  Users,
  UserGroupsServiceProxy
} from 'src/app/shared/api/service-proxies';

@Component({
  selector: 'app-identity-detail',
  templateUrl: './identity-detail.component.html',
  styleUrls: ['./identity-detail.component.scss']
})
export class IdentityDetailComponent implements OnInit, OnChanges {
  @ViewChild(IdentityEditComponent, { static: false })
  identityEditComponent: IdentityEditComponent;

  @Input() displayIdentity: Users;

  showUserEdit = false;
  mockIdtyGroup: any = {
    name: 'Admin',
    parentGroup: 'n/a',
    permissions: {
      logs: ['Modify', 'Export'],
      users: ['Add', 'Delete', 'Modify'],
      keys: []
    },
    passPolicy: {
      length: { min: 8, max: 99 },
      alphabetical: { min: 2, max: 50 },
      uppercase: { min: 1, max: 10 },
      lowercase: { min: 1, max: 10 },
      numeric: { min: 1, max: 25 },
      symbols: { min: 1, max: 25 }
    },
    loginsRequired: 2,
    userLocation: 'Database',
    ldapVerify: false,
    ldapGroup: 'string',
    oauthSettings: {
      enabled: true,
      tokenLifetime: 700,
      clientId: '23t5dfw4rxwa',
      macKeyName: '87tgf5e4ec34'
    },
    otpSettings: {
      required: false,
      portList: ['Client', 'Web'],
      timeout: 800
    }
  };
  createdAt = '2020-01-02 01:01:01';

  constructor(private configService: UserGroupsServiceProxy) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.displayIdentity.currentValue) {
      this.configService
        .usergroupsGet(changes.displayIdentity.currentValue.primaryGroup)
        .subscribe(console.log);
    }
  }

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
