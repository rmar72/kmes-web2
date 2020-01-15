import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    private usersService: UsersServiceProxy) { }

  ngOnInit() {
    $(document).ready(() => {
      $(".toggle-popover").popover({ trigger: "hover" });
    });
  }

  getLoginsRequired(count) {
    return `${count} identities required for login`;
  }

  getIdentitiesForGroup(groupName: string, i: number, c?: number) {
    if(this.identityGroups[i].numUsers > 0) {
      let mockData = [
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
      if(c && this.identityGroups[i].childGroups[c] && !this.identityGroups[i].childGroups[c].identities) {
        this.identityGroups[i].childGroups[c].identities = mockData;
      } else if(!this.identityGroups[i].identities) {
        this.identityGroups[i].identities = mockData;
  
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
  }
}
