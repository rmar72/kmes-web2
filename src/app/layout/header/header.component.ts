import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
    showOpenSidebar: boolean = true;
    showHardwareInfo: boolean = false;
    showDropdown: boolean = false;

    constructor() { }

    ngOnInit() {

    }

    toggleSidebar = function() {
        this.showOpenSidebar = !this.showOpenSidebar;
    }

    toggleHardwareInfo = function() {
        this.showHardwareInfo = !this.showHardwareInfo;
    }

}
