import { Component, OnInit, Input, Output, EventEmitter, ɵEMPTY_ARRAY, ElementRef } from '@angular/core';
import { UsersServiceProxy } from 'src/app/shared/api/service-proxies';
import { from, of, forkJoin } from "rxjs";
import { catchError, map, take } from 'rxjs/operators';
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
  identityIsChecked = {};
  deleteIdtys = [];

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

  masterCheckbox: boolean = false;
  onSelectAllBoxes(e){
    let checkboxes = this.checkbox.nativeElement.querySelectorAll('.idty-checkbox');
    this.masterCheckbox = !this.masterCheckbox;

    if(!this.masterCheckbox && this.deleteIdtys.length >= 1){
      checkboxes.forEach(element => {
        if(element.checked)
          element.checked = !element.checked;
      });
      this.deleteIdtys = [];
    }
    if(this.masterCheckbox === true){
      checkboxes.forEach(element => {
        if(element.checked == false)
          element.checked = !element.checked;
      });

      from(this.identities).pipe(
        map(idty => idty.username)
        // take(2), whatever is available on the page
      )
      .subscribe(value => {
        this.deleteIdtys.push(value);
      });
    }
    else {
      checkboxes.forEach(element => {
        element.checked = false;
        this.deleteIdtys = [];
      });
    }

  }

  onSelectAllBoxes2(){
    alert(1)
  }

  onBoxCheck2(e, checkedIdty){
    this.identityIsChecked[checkedIdty.username] = e.target.checked;

    if(this.identityIsChecked[checkedIdty.username]){
      this.deleteIdtys.push(checkedIdty.username);
      console.log("this.deleteIdtys", this.deleteIdtys)
    }
    else {
      this.deleteIdtys = this.deleteIdtys.filter(queuedIdtyName => queuedIdtyName !== checkedIdty.username);
      console.log("this.deleteIdtys", this.deleteIdtys)
    }
    
    this.masterCheckbox = this.deleteIdtys.length == this.identities.length ? true : false;
  }

  onBoxCheck(e, idty){
    console.log(0)
    this.identityIsChecked[idty.username] = e.target.checked;
    if(this.deleteIdtys.length !== this.identities.length){
      this.masterCheckbox = false;
    }
    if(this.masterCheckbox){ // if its checked, and we are executing this fn then obv we've deselected so its no longer all of em
      console.log(1) 
      this.masterCheckbox = !this.masterCheckbox;
    }

    if(this.identityIsChecked[idty.username]){
      console.log(2)
      this.deleteIdtys.push(idty.username);
    }
    else {
      console.log(3)
      this.deleteIdtys = this.deleteIdtys.filter(idtyName => idtyName !== idty.username);
    }

    if(this.deleteIdtys.length == this.identities.length){ // if all boxes selected toggle master checkbox
      console.log(4)
      this.masterCheckbox = !this.masterCheckbox;
    }
  }

  deleteIdentities(){
    // console.log("this.deleteIdtys", this.deleteIdtys)
    if(this.deleteIdtys.length > 0){
      let deleteConfirm = confirm(`You are about to delete ${this.deleteIdtys.length} Identities. This action cannot be undone. Would you like to continue?`);

      if(deleteConfirm){
          
        const deleteList = this.deleteIdtys.map(idty => 
          this.usersService.usersDelete(idty).pipe(
            catchError(err => of(`handled err ${err}`))
          ));
        
        forkJoin(...deleteList).subscribe(val => {
            // temp solution for demo purposes
            // later on, this wont be used since idty mgt will replinish the list
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
