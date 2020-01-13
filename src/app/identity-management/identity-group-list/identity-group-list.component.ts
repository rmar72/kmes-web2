import { Component, OnInit, Input } from '@angular/core';

declare var $;

@Component({
  selector: 'app-identity-group-list',
  templateUrl: './identity-group-list.component.html',
  styleUrls: ['./identity-group-list.component.scss']
})
export class IdentityGroupListComponent implements OnInit {
  @Input() identityGroups: any[];

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $(".toggle-popover").popover({ trigger: "hover" });
    });
  }

  getLoginsRequired(count) {
    return `${count} identities required for login`
  }

}
