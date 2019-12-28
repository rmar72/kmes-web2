import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-identity-group-detail',
  templateUrl: './identity-group-detail.component.html',
  styleUrls: ['./identity-group-detail.component.scss']
})
export class IdentityGroupDetailComponent implements OnInit {

  @Input() displayIdentityGroup: any;

  constructor() { }

  ngOnInit() {
  }

}
