import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersManagementService, CreateUser, Carriers } from '../services/users-proxy.service';

@Component({
  selector: 'app-identity-create',
  templateUrl: './identity-create.component.html',
  styleUrls: ['./identity-create.component.scss']
})
export class IdentityCreateComponent implements OnInit {
  @ViewChild('personalizeForm', { static: false }) pForm: NgForm;
  identities: CreateUser = {
    personalInfo: {
      firstName: '',
      lastName: '',
      commonName: '',
      email: '',
      phone: '',
      mobileCarrier: ''
    }
  };
  carriers = Carriers;
  constructor(private usersManagement: UsersManagementService) { }

  ngOnInit() {
  }
  submitCreateIdentity() {
    this.usersManagement.create({ ...this.identities })
      .subscribe(response => {
        console.log(response);
      });
  }
  resetForms() {
    this.pForm.resetForm();
  }

}

export interface IdentityCreateData {
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    commonName?: string;
    email?: string;
    phone?: string;
    carrier?: string;
  };
}
