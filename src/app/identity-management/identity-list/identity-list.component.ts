import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersServiceProxy } from 'src/app/shared/api/service-proxies';
import { AppToastService } from 'src/app/shared/services/app-toast.service';

@Component({
  selector: 'app-identity-list',
  templateUrl: './identity-list.component.html',
  styleUrls: ['./identity-list.component.scss']
})
export class IdentityListComponent implements OnInit {
  @Input() identities: any[];
  @Input() currentPage: number;
  @Input() pageCount: number;
  @Input() identityCount: number;
  @Input() totalPages: number;
  @Input() pageArray: any[];
  @Output() identityDeleted = new EventEmitter<string>();
  @Output() selectedIdentity = new EventEmitter<any>();
  @Output() selectedIdentityGroup = new EventEmitter<any>();
  @Output() updatePageCount = new EventEmitter<any>();
  @Output() updateCurrentPage = new EventEmitter<any>();

  usernameSetter = "";
  groupSetter = "";
  statusSetter = "";
  dateSetter = "";

  constructor(
    private usersService: UsersServiceProxy,
    private toast: AppToastService
  ) {}

  ngOnInit() {
    setTimeout( () => {
      this.identities = [
        {username: "Ruben", primaryGroup: "Child", subGroups: Array(2), valid: true, lastLogin: "1993-05-03 23:59:59"},
        {username: "Jason", primaryGroup: "Admin", subGroups: Array(0), valid: true, lastLogin: "1990-05-03 23:59:59"},
        {username: "Juan Carlos", primaryGroup: "Admin", subGroups: Array(0), valid: true, lastLogin: "1990-05-03 23:59:59"},
        {username: "User1", primaryGroup: "Admin", subGroups: Array(0), valid: true, lastLogin: "1990-05-03 23:59:59"},
        {username: "Juan Carlos9", primaryGroup: "Admin", subGroups: Array(0), valid: true, lastLogin: "1990-05-03 23:59:59"},
        {username: "Juan Charlie", primaryGroup: "Admin", subGroups: Array(0), valid: false, lastLogin: "1990-05-03 23:59:59"},
        {username: "Esvyn", primaryGroup: "Child Group2", subGroups: Array(0), valid: false, lastLogin: "1991-05-03 23:59:59"},
        {username: "Matt", primaryGroup: "Child", subGroups: Array(2), valid: false, lastLogin: "1994-05-03 23:59:59"},
        {username: "User2", primaryGroup: "Admin", subGroups: Array(0), valid: true, lastLogin: "1990-05-03 23:59:59"},
        {username: "Chris", primaryGroup: "Redemption", subGroups: Array(0), valid: true, lastLogin: "1996-05-03 23:59:59"},
        {username: "Neto", primaryGroup: "Game", subGroups: Array(0), valid: false, lastLogin: "1999-05-03 23:59:59"},
      ]
    }, 4000)
  }

  selectIdentity(identity: any) {
    this.selectedIdentity.emit(identity);
  }

  selectIdentityGroup(identity: any) {
    this.selectedIdentityGroup.emit(identity);
  }

  deleteIdentity(identity: any, index: number) {
    this.usersService.usersDelete(identity.username).subscribe(
      (response) => {
        this.identityDeleted.emit(response.message);
        this.toast.success('Identity was deleted');
      },
      (error) => {
        this.toast.error('Unable to delete identity');
      }
    );
  }

  emitUpdatePageCount(count: number) {
    if(count != this.pageCount) {
        this.updatePageCount.emit(count);
    }
  }

  emitUpdateCurrentPage(page: number) {
    if(page != this.currentPage && page >= 1 && page <= this.totalPages) {
      this.updateCurrentPage.emit(page);
    }
  }

  counter(i: number) {
    return new Array(i);
  }


  sort(prop, order){
    console.time()
    if(this[order]===''){
      this[order]="ASC";
    }
    if(this[order]==="ASC"){
      this.identities.sort((a,b) => b[prop] > a[prop] ? -1 : 1 );
      this[order]="DESC";
    }
    else {
      this.identities.sort((a,b) => a[prop] > b[prop] ? -1 : 1 );
      this[order]="ASC";
    }
    console.timeEnd()
  }
  
  dateSort(){
    if(this.dateSetter===''){
      this.dateSetter="ASC";
    }
    if(this.dateSetter==="ASC"){
      this.dateSetter="DESC";
      this.identities.sort((a,b) => +new Date(a.lastLogin) - +new Date(b.lastLogin) );
    }
    else {
      this.dateSetter="ASC";
      this.identities.sort((a,b) => +new Date(b.lastLogin) - +new Date(a.lastLogin) );
    }
  }
  
}
