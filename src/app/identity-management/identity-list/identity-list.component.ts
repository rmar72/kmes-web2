import { Component, OnInit, Input, Output, EventEmitter, ɵEMPTY_ARRAY, ElementRef } from '@angular/core';
import { UsersServiceProxy } from 'src/app/shared/api/service-proxies';
import { of, forkJoin } from "rxjs";
import { catchError, retry } from 'rxjs/operators';
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
  // identityCount: number;
  deleteError = '';
  errorIndex: number;
  idtyIsChecked = {};
  deleteIdtys = [];
  masterCheckbox: boolean = false;

  constructor(
    private usersService: UsersServiceProxy,
    private checkbox: ElementRef,
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

  deleteSelectAll(){
    let checkboxes = this.checkbox.nativeElement.querySelectorAll('.idty-checkbox');
    this.masterCheckbox= !this.masterCheckbox;

    if(this.masterCheckbox){
      checkboxes.forEach(box => { 
        setTimeout(() => box.checked = true, 0);
      });

      this.deleteIdtys = [
        ...this.identities.map(idty => {
          this.idtyIsChecked[idty.username] = true;
          return idty.username;
        })
      ];
    }
    else{
      checkboxes.forEach(box => {
        setTimeout(() => box.checked = false, 0);
      });

      this.identities.forEach( idty => this.idtyIsChecked[idty.username] = false );
      this.deleteIdtys = [];
    }
  }

  onBoxCheck(e, checkIdty){
    this.idtyIsChecked[checkIdty.username] = e.target.checked;

    if(this.idtyIsChecked[checkIdty.username]){
      this.deleteIdtys.push(checkIdty.username);
    }
    else {
      this.deleteIdtys = this.deleteIdtys.filter(queuedIdtyName => queuedIdtyName !== checkIdty.username);
    }

    this.masterCheckbox = this.deleteIdtys.length == this.identities.length ? true : false;
  }

  deleteIdentities(){
    if(this.deleteIdtys.length > 0){
      let deleteConfirm = confirm(`You are about to delete ${this.deleteIdtys.length} Identities. This action cannot be undone. Would you like to continue?`);

      if(deleteConfirm){
        const deleteList = this.deleteIdtys.map(idty => 
          this.usersService.usersDelete(idty).pipe(
            retry(1),
            catchError(err => of(`handled err ${err}`))
          ));
        
        forkJoin(...deleteList).subscribe(val => {
            // temp solution for demo purposes. later on, idty mgt will replinish/update the list
            if(this.identities.length == 1){
              this.identityDeleted.emit(val);
            }
            this.identities = this.identities.filter(idty =>
              this.deleteIdtys.indexOf(idty.username) < 0 );

            this.toast.success("Deleted selected identities");
            if(this.identities.length == 0){
              this.identityDeleted.emit(val);
            }
            this.deleteIdtys = [];
            this.masterCheckbox = false;

            // --- when api starts working this should suffice ---
            // this.identityDeleted.emit(val);
            // this.deleteIdtys = [];
            // this.masterCheckbox = false;
            // this.toast.success("Deleted");
          },
          err => {
            console.log(err)
            this.toast.error("Unable to delete selected identities")
          }
        );
      }
    }
    else {
      alert("No identities have been selected.");
    }
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
