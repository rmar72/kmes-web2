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

  detailViewSwitch(subject, selectedEntity, dictateView, removeView){

    if(this.showDetailView === false){
      this.toggleFullscreen();
    }

    if(this.showDetailView){
      subject.next(selectedEntity);

      if(this[dictateView] == false){
        this[dictateView] = true;
        this[removeView] = false;
      }
    }
  }

  selectIdentity(identity: any): void {
    this.detailViewSwitch(
      this.displayIdentity$,
      identity,
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
