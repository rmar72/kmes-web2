import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersManagementService } from '../services/users-management.service';

@Component({
    selector: 'app-identity-list',
    templateUrl: './identity-list.component.html',
    styleUrls: ['./identity-list.component.scss']
})
export class IdentityListComponent implements OnInit {
    identities: any[] = [];
    identityCount: number;
    deleteError: string = '';
    errorIndex: number;

    @Output() setIdentityCount = new EventEmitter<number>();

    constructor(private usersManagement: UsersManagementService) { }

    ngOnInit() {
        //get identities
        this.getIdentities();
    }

    getIdentities() {
        this.usersManagement.read().subscribe(response => {
            this.setIdentityCount.emit(response.responseData.totalItems);
            this.identities = response.responseData.users;
        });
    }

    getInitials(username: string) {
        return username.substring(0,2).toUpperCase();
    }

    deleteIdentity(identity: any, index: number) {
        //delete identity 
        //get identities
        //show error message if needed
        this.deleteError = 'Unable to delete this identity.';
        this.errorIndex = index;
    }

}
