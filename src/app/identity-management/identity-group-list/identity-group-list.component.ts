import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersServiceProxy } from 'src/app/shared/api/service-proxies';

declare var $;

@Component({
  selector: 'app-identity-group-list',
  templateUrl: './identity-group-list.component.html',
  styleUrls: ['./identity-group-list.component.scss']
})
export class IdentityGroupListComponent implements OnInit {
  @Input() identityGroups: any[];
  @Input() groupCount: string;
  @Output() selectIdentity = new EventEmitter<any>();
  @Output() deleteIdentity = new EventEmitter<any>();

  childIndex = 1;

  constructor(
    private usersService: UsersServiceProxy) { }

  ngOnInit() {
    $(document).ready(() => {
      $(".toggle-popover").popover({ trigger: "hover" });
    });
  }

  emitSelectIdentity(identity) {
    this.selectIdentity.emit(identity);
  }

  emitDeleteIdentity(identity) {
    this.deleteIdentity.emit(identity);
  }

  getChildren(group) {
    let mockChildGroups = [
      {
        "name": "Child Group ",
        "active": true,
        "created": "2019-11-02 23:59:59",
        "numUsers": 2,
        "loginsRequired": 2,
        "ldapVerify": true,
        "otpEnabled": true
      },
      {
        "name": "Child Group ",
        "active": false,
        "created": "2019-11-02 23:59:59",
        "numUsers": 2,
        "loginsRequired": 2,
        "ldapVerify": false,
        "otpEnabled": false
      }
    ]

    mockChildGroups.forEach(group => {
      group.name += this.childIndex; 
      this.childIndex++;
    })

    group.childGroups = mockChildGroups;

    // TO DO use actual service call when API is working 
    // this.userGroupsService.usergroupsGet(group.name).subscribe(
    // (resp) => {
    //   group.childGroups(resp.responseData.usergroups);
    // },
    // (error) => {
    //   console.log(error)
    // });
  }

  getIdentities(group) {
      let mockIdentities = [
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
          "primaryGroup": "Admin",
          "subGroups": [
            "Child Group1",
            "Child Group2"
          ],
          "valid": true,
          "lastLogin": "2019-12-10 23:59:59"
        }
      ]

      group.identities = mockIdentities;

      $(".toggle-popover").popover({ trigger: "hover" });

      // TO DO use actual service call when API is working 
      // this.usersService.usersGet(undefined, groupName, undefined, undefined).subscribe(
      //   (response) => {
      //     this.identityGroups[i].identities = response.responseData.users;
      //   },
      //   (error) => {
      //     console.log(error)
      //   }
      // );
    }
}
