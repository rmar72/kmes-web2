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
 
  @Input() displayIdentity: Users;
  @ViewChild(IdentityEditComponent, { static: false })
  identityEditComponent: IdentityEditComponent;
  showUserEdit = false;

  constructor(private configService: UserGroupsServiceProxy) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    // if (changes.displayIdentity.currentValue) {
    //   this.configService
    //     .usergroupsGet(changes.displayIdentity.currentValue.primaryGroup)
    //     .subscribe(console.log);
    // }
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
