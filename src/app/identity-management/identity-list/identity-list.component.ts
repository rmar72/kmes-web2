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

  identityCount: number;
  deleteError = '';
  errorIndex: number;
  constructor(private usersService: UsersServiceProxy) {}

  ngOnInit() {
  }

  selectIdentity(identity: any){
    this.selectedIdentity.emit(identity);
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
}
