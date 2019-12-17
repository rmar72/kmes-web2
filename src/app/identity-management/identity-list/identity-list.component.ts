import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-identity-list',
    templateUrl: './identity-list.component.html',
    styleUrls: ['./identity-list.component.scss']
})
export class IdentityListComponent implements OnInit {
    identities: any[] = [];

    constructor() { }

    ngOnInit() {
        //get identities
    }

}
