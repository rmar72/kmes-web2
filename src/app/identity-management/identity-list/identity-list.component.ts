import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-identity-list',
    templateUrl: './identity-list.component.html',
    styleUrls: ['./identity-list.component.scss']
})
export class IdentityListComponent implements OnInit {
    identities: any[] = [];
    mockResponseData = {
        "status": "success",
        "message": "",
        "responseData": {
          "totalItems": 3,
          "totalPages": 1,
          "pageCount": 50,
          "currentPage": 1,
          "nextPage": 1,
          "users": [
            {
                "username": "User1",
                "primaryGroup": "Admin",
                "subGroups": [
                    "Child Group1",
                    "Child Group2"
                ],
                "valid": true,
                "lastLogin": "2019-12-10 23:59:59"
            },
            {
                "username": "User2",
                "primaryGroup": "Child Group1",
                "subGroups": [],
                "valid": true,
                "lastLogin": "2019-12-10 23:59:59"
            },
            {
                "username": "User Three",
                "primaryGroup": "Child Group2",
                "subGroups": [],
                "valid": false,
                "lastLogin": "2019-12-10 23:59:59"
            }
          ]
        }
      }

    constructor() { }

    ngOnInit() {
        //get identities
        this.identities = this.mockResponseData.responseData.users;
    }

    getInitials(username: string) {
        return username.substring(0,2).toUpperCase();
    }

}
