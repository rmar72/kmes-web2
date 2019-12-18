import { Component, OnInit, Output, Input, EventEmitter, SimpleChange, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-identity-create',
  templateUrl: './identity-create.component.html',
  styleUrls: ['./identity-create.component.scss']
})
export class IdentityCreateComponent implements OnInit {
  @ViewChild('personalizeForm', {static: false}) pForm: NgForm;
  identities: IdentityCreateData = {
    personalize: {
      firstName: '',
      lastName: '',
      commonName: '',
      email: '',
      phone: '',
      carrier: ''
    }
  };
  carriers = [
    'Alltel',
    'AT&T',
    'Boost Mobile',
    'Xfinity Mobile',
    'Sprint',
    'T-Mobile',
    'Tracfone',
    'Verizon',
    'Virgin Mobile',
    'Rogers (Canada)',
    'Vodacom (South Africa)',
    'MTN Group (South Africa)'
  ];

  constructor() { }

  ngOnInit() {
  }
  submitCreateIdentity() {
    console.log('submit:', this.identities);
  }
  resetForms() {
    this.pForm.resetForm();
  }

}

export interface IdentityCreateData {
  personalize?: {
    firstName?: string;
    lastName?: string;
    commonName?: string;
    email?: string;
    phone?: string;
    carrier?: string;
  };
}
