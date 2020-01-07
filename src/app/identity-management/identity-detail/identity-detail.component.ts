import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-identity-detail',
  templateUrl: './identity-detail.component.html',
  styleUrls: ['./identity-detail.component.scss']
})
export class IdentityDetailComponent implements OnInit {

  @Input() displayIdentity: any;

  constructor() {}

  ngOnInit() {}

}
