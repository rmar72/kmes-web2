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
  @Output() selectedIdentity = new EventEmitter<any>();
  @Output() selectedIdentityGroup = new EventEmitter<any>();
  @Output() updatePageCount = new EventEmitter<any>();
  @Output() updateCurrentPage = new EventEmitter<any>();
  @Output() deleteIdentity = new EventEmitter<any>();
  @Output() identityDeleted = new EventEmitter<any>();

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

  ngOnInit() {}

  selectIdentity(identity: any) {
    this.selectedIdentity.emit(identity);
  }

  selectIdentityGroup(identity: any) {
    this.selectedIdentityGroup.emit(identity);
  }

  emitDeleteIdentity(identity, index) {
    this.deleteIdentity.emit(identity);
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

  sortColumns = {
    usernameAsc: null,
    groupAsc: null,
    statusAsc: null,
    dateAsc: null
  }

  ascendColumn(column){
    switch(column){ // determine asc/desc
      case true:
        return false;
      case false:
        return true;
      default:
        return true;
    }
  }

  activateCaret(columnToAscend){
    for(let col in this.sortColumns){
      if(col !== columnToAscend){
        this.sortColumns[col] = null;
      }
    }
  }

  sortTable(header, column){
    if(this.ascendColumn(this.sortColumns[column])){ // asc mode
      if(header === "lastLogin"){
        this.identities.sort((a,b) => +new Date(a.lastLogin) - +new Date(b.lastLogin) );
      }
      else {
        this.identities.sort((a,b) => b[header] > a[header] ? -1 : 1 );
      }
      this.sortColumns[column]=true;
    }
    else { // desc mode
      if(header === "lastLogin"){ 
        this.identities.sort((a,b) => +new Date(b.lastLogin) - +new Date(a.lastLogin) );
      }
      else {
        this.identities.sort((a,b) => a[header] > b[header] ? -1 : 1 );
      }
      this.sortColumns[column]=false;
    }

    this.activateCaret(column);
  }
  
  
}
