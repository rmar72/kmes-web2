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

  constructor(private usersService: UsersServiceProxy, private toast: AppToastService) {}

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
      if(page != this.currentPage) {
        this.updateCurrentPage.emit(page);
      }
  }

    counter(i: number) {
        return new Array(i);
    }


}
