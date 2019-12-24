import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

    activeRoute: string = '';

    constructor(private router: Router) { }

    ngOnInit() {
        $(document).ready(() => {
            $('.sidebar-menu').tree();
        });
        this.activeRoute = this.router.url;
    }

    updateRoute = function() {
        this.activeRoute = this.router.url;
    }

}