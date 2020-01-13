import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-identity-group-list',
  templateUrl: './identity-group-list.component.html',
  styleUrls: ['./identity-group-list.component.scss']
})
export class IdentityGroupListComponent implements OnInit {
  @Input() identityGroups: any[];

  constructor() { }

  ngOnInit() {
  }

}
