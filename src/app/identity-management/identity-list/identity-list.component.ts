import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientApi } from 'src/app/shared/services/api/service-proxies';

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

  constructor(private api: ClientApi) {}

  ngOnInit() {
  }

  selectIdentity(identity: any){
    this.selectedIdentity.emit(identity);
  }

  deleteIdentity(identity: any, index: number) {
    this.api.usersDelete(identity.username).subscribe(
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
