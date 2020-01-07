import { Component, OnInit } from '@angular/core';
import {
  Users,
  UsersServiceProxy
} from '../shared/api/service-proxies';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-identity-management',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss']
})
export class IdentityManagementComponent implements OnInit {
  showFullscreen = false;
  showDetailView = false;
  showIdtyGroupDetail = false;
  showIdtyDetail = false;
  showCreateGroup = false;
  showCreateIdentity = false;
  identityCount = 0;
  usersGet$ = this.usersService.usersGet();
  identities$ = new Subject<Users[]>();
  identityCount$ = new Subject<string>();
  displayIdentity$ = new Subject<any>();
  displayIdentityGroup$ = new Subject<any>();

  constructor(private usersService: UsersServiceProxy) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.usersGet().subscribe(resp => {
      this.identities$.next(resp.responseData.users);
      this.identityCount$.next(`(${resp.responseData.totalItems})`);
    });
  }

  toggleFullscreen() {
    this.showFullscreen = !this.showFullscreen;
    this.showDetailView = !this.showDetailView;
  }

  deleteUser(username: string) {
    this.usersService.usersDelete(username).subscribe(resp => {
      console.log(resp);
      this.getUsers();
    });
  }

  toggleCreateGroup(): void {
    this.showCreateGroup = !this.showCreateGroup;
  }

  // clear create group form
  discardCreateGroup(): void {
    this.showCreateGroup = !this.showCreateGroup;
  }

  submitCreateGroup(): void {}

  toggleCreateIdentity(): void {
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  // clear create identity form
  discardCreateIdentity(): void {
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  submitCreateIdentity(): void {}

  resetForms(): void {
    this.showCreateGroup = false;
    this.showCreateIdentity = false;
  }

  onIdentityDeleted(username: string) {
    this.deleteUser(username);
  }

  detailViewSwitch(subject, selectedEntity, dictateView, showCurrentView) {

    if(this.showDetailView === false){
      this.toggleFullscreen();
    }

    if(this.showDetailView){
      subject.next(selectedEntity);

      if(this[dictateView] === false){
        this[dictateView] = true;
        this[showCurrentView] = false;
      }
    }
  }

  getUserDetails(username) {
    // api call will replace mock objects below

    const mockIdty = {
      username:	"Main User",
      primaryGroup:	"Admin",
      subGroups:	["Cool Group1", "Cool Group2"],
      valid:	false,
      lastLogin:	"2020-01-03 06:36:00",
      createdAt: "2020-01-02 01:01:01",
      personalInfo:	{
        firstName:	"John",
        lastName:	"Doe",
        commonName:	"foo",
        givenName:	"foo",
        surname:	"Jonny",
        mobileCarrier:	"Verizon",
        phone:	"303-303-3030",
        email: "foo@email.com"
      }
    }
    const mockIdtyGroup = {
      name: "Admin",
      parentGroup: "n/a",
      permissions: {
        logs: [
          "Modify",
          "Export"
        ],
        users: [
          "Add",
          "Delete",
          "Modify"
        ],
        keys: []
      },
      passPolicy: {
        length: {min:8, max: 99},
        alphabetical:{min:2, max: 50},
        uppercase: {min:1, max: 10},
        lowercase: {min:1, max: 10},
        numeric: {min:1, max: 25},
        symbols: {min:1, max: 25}
      },
      loginsRequired: 2,
      userLocation: "Database",
      ldapVerify: false,
      ldapGroup: "string",
      oauthSettings: {
        enabled:	true,
        tokenLifetime:	700,
        clientId:	"23t5dfw4rxwa",
        macKeyName:	"87tgf5e4ec34"
      },
      otpSettings: {
        required: false,
        portList: ["Client", "Web"],
        timeout: 800
      }
    }

    const identityDetail = {
      mockIdty,
      mockIdtyGroup
    }

    return identityDetail;
  }

  selectIdentity(identity: any): void {
    this.detailViewSwitch(
      this.displayIdentity$,
      this.getUserDetails(identity),
      'showIdtyDetail',
      'showIdtyGroupDetail'
    );
  }

  selectIdentityGroup(identityGroup: any): void {
    this.detailViewSwitch(
        this.displayIdentityGroup$, 
        identityGroup,
        'showIdtyGroupDetail',
        'showIdtyDetail'
    );
  }

}
