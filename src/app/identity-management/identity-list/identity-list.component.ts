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
  @Output() identityDeleted = new EventEmitter<string>();
  @Output() selectedIdentity = new EventEmitter<any>();
  @Output() selectedIdentityGroup = new EventEmitter<any>();

  identityCount: number;
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

            this.toast.success("Deleted");
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
            this.toast.error("Unable to delete")
          }
        );
      }
    }
    else {
      alert("No identities have been selected.");
    }
  }
  
}
