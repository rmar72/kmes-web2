import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersServiceProxy } from 'src/app/shared/api/service-proxies';

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
  constructor(private usersService: UsersServiceProxy) {}

  ngOnInit() {
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
      },
      (error) => {
        this.deleteError = 'Unable to delete this identity';
        this.errorIndex = index;
      }
    );
  }

  checkedBoxes = {}
  deleteIdtys = []

  addCheckBox(e, idty){
    this.checkedBoxes[idty.username] = e.target.checked;

    if(this.checkedBoxes[idty.username]){
      this.deleteIdtys.push(idty.username);
    }
    else {
      this.deleteIdtys = this.deleteIdtys.filter(idtyName => idtyName !== idty.username);
    }
  }
  

  deleteIdentities(){
    if(this.deleteIdtys.length > 0){
      let deleteConfirm = confirm(`You are about to delete ${this.deleteIdtys.length} Identities. This action cannot be undone. Would you like to continue?`);

      if(deleteConfirm){
          
        const deleteList = this.deleteIdtys
          .map(idty => this.usersService.usersDelete(idty).pipe(
            catchError(err => of(`handled err ${err}`))
          ));
        
        forkJoin(...deleteList).subscribe(
          val => {
            // temp solution for demo purposes, with emitter to idty mngt comp. api call will replinish list 
            if(this.identities.length == 1){
              this.identityDeleted.emit(this.identities[0].username);
            }

            this.identities = this.identities.filter(idty =>
              this.deleteIdtys.indexOf(idty.username) < 0
            );
            this.deleteIdtys = [];
          },
          err => console.log(err)
        );
      }
    }
    else {
      alert("No identities have been selected.")
    }
  }
  

}
