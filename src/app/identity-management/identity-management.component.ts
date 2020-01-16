import { Component, OnInit } from '@angular/core';
import {
  Users,
  UsersServiceProxy,
  GetUserList
} from '../shared/api/service-proxies';
import { Subject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-identity-management',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss'],
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
  identities$ = new ReplaySubject<Users[]>();
  identityCount$ = new Subject<string>();
  displayIdentity$ = new Subject<any>();
  displayIdentityGroup$ = new Subject<any>();
  currentPage: number = 1;
  pageCount: number = 20;
  totalPages: number;
  pageArray: any[];

  constructor(private usersService: UsersServiceProxy) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.usersGet(undefined, undefined, this.currentPage, this.pageCount).subscribe(resp => {
      // this.totalPages = 8;
      this.totalPages = resp.responseData.totalPages;
      this.identities$.next(resp.responseData.users);
      this.identityCount$.next(`${resp.responseData.totalItems}`);
      // this.identities$.next(
      //   [
      //     {username: "User2", primaryGroup: "IoT", subGroups: Array(0), valid: true, lastLogin: "2010-05-03 23:59:59"},
      //     {username: "Jonathan Muniz", primaryGroup: "Admin", subGroups: Array(0), valid: true, lastLogin: "2019-11-03 23:59:59"},
      //     {username: "John Doe", primaryGroup: "Healthcare", subGroups: Array(0), valid: true, lastLogin: "2019-11-03 23:59:59"},
      //     {username: "Anna Casper", primaryGroup: "Child", subGroups: ["Management", "Custom1"], valid: true, lastLogin: "2015-05-03 23:59:59"},
      //     {username: "User1", primaryGroup: "Telecomm", subGroups: Array(0), valid: true, lastLogin: "2016-05-03 23:59:59"},
      //     {username: "John Doe9", primaryGroup: "Power", subGroups: Array(0), valid: true, lastLogin: "2017-05-03 23:59:59"},
      //     {username: "Foo 23", primaryGroup: "Admin1", subGroups: Array(0), valid: false, lastLogin: "2019-05-03 23:59:59"},
      //     {username: "Ruben Sol", primaryGroup: "Child Group2", subGroups: Array(0), valid: false, lastLogin: "2012-12-03 23:59:59"},
      //     {username: "Matt", primaryGroup: "Aerospace", subGroups: ["Management", "Custom1"], valid: false, lastLogin: "2019-05-04 23:59:59"},
      //     {username: "Chris", primaryGroup: "Redemption", subGroups: Array(0), valid: true, lastLogin: "1996-05-03 23:59:59"},
      //     {username: "User3", primaryGroup: "Telecomm 2", subGroups: Array(0), valid: false, lastLogin: "1999-05-03 23:59:59"}
      //   ]
      // );
      // this.identityCount$.next(`11`);
      this.createPaginationArray();
    });
  }

  toggleFullscreen() {
    this.showFullscreen = !this.showFullscreen;
    this.showDetailView = !this.showDetailView;
  }

  toggleCreateGroup(): void {
    this.showCreateGroup = !this.showCreateGroup;
  }

  // clear create group form
  discardCreateGroup(): void {
    this.showCreateGroup = !this.showCreateGroup;
  }

  submitCreateGroup(): void { }

  toggleCreateIdentity(): void {
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  // clear create identity form
  discardCreateIdentity(): void {
    this.showCreateIdentity = !this.showCreateIdentity;
  }

  submitCreateIdentity(): void { }

  resetForms(): void {
    this.showCreateGroup = false;
    this.showCreateIdentity = false;
  }

  onIdentityDeleted(res: string) {
    this.getUsers();
  }

  detailViewSwitch(subject, selectedEntity, dictateView, showCurrentView) {

    if (this.showDetailView === false) {
      this.toggleFullscreen();
    }

    if (this.showDetailView) {
      subject.next(selectedEntity);

      if (this[dictateView] === false) {
        this[dictateView] = true;
        this[showCurrentView] = false;
      }
    }
  }

  getUserDetails(username) {
    // api call will replace mock objects below

    const mockIdty = {
      username: 'Main User',
      primaryGroup: 'Admin',
      subGroups: ['Cool Group1', 'Cool Group2'],
      valid: false,
      lastLogin: '2020-01-03 06:36:00',
      createdAt: '2020-01-02 01:01:01',
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        commonName: 'foo',
        givenName: 'foo',
        surname: 'Jonny',
        mobileCarrier: 'Verizon',
        phone: '303-303-3030',
        email: 'foo@email.com'
      }
    };
    const mockIdtyGroup = {
      name: 'Admin',
      parentGroup: 'n/a',
      permissions: {
        logs: [
          'Modify',
          'Export'
        ],
        users: [
          'Add',
          'Delete',
          'Modify'
        ],
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
        required: true,
        portList: ["Client", "Web"],
        timeout: 800
      }
    };

    for (const key in mockIdtyGroup.permissions) {
      if (key) {
        mockIdtyGroup.permissions[key].unshift('View');
      }
    }

    const identityDetail = {
      mockIdty,
      mockIdtyGroup
    };

    return identityDetail;
  }

  selectIdentity_deprecated(identity: any): void {
    this.detailViewSwitch(
      this.displayIdentity$,
      this.getUserDetails(identity),
      'showIdtyDetail',
      'showIdtyGroupDetail'
    );
  }

  selectIdentity(identity: Users) {
    this.showFullscreen = true;
    this.showDetailView = true;
    this.showIdtyDetail = true;
    this.displayIdentity$.next(identity);
  }

  selectIdentityGroup(identityGroup: any): void {
    this.detailViewSwitch(
      this.displayIdentityGroup$,
      identityGroup,
      'showIdtyGroupDetail',
      'showIdtyDetail'
    );
  }

  updatePageCount(count: number) {
    this.pageCount = count; 
    this.getUsers();
  }

  updateCurrentPage(page: number) {
    this.currentPage = page; 
    this.getUsers();
  }

  createPaginationArray() {
    let range = 7;
    this.pageArray = [];
    if(this.totalPages <= 7) {
        for(let i = 0; i < this.totalPages; i++) {
          this.pageArray.push(i + 1);
        }
    } else {
      if(this.currentPage <=3) {
        for(let i = 0; i < range - 2; i++) {
          this.pageArray.push(i + 1);
        }
        this.pageArray.push('...');
        this.pageArray.push(this.totalPages);
      } else if(this.currentPage > 3 && this.currentPage < this.totalPages - 2) {
        this.pageArray = [1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages]
      } else if(this.currentPage >= this.totalPages - 2) {
        this.pageArray = [1, '...'];
        for(let i = range - 3; i > 0; i--) {
          this.pageArray.push(this.totalPages - i);
        }
        this.pageArray.push(this.totalPages);
      }
    }
  }

}
