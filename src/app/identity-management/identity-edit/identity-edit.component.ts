import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import {
  UsersServiceProxy,
  IPersonalInfo,
  PERSONAL_INFO_PHONE,
  UpdateUser,
  Users,
  UsersPostBodyRequestData,
  IGetUserDetails,
  ResponseBase,
  UsersGetResponse,
  GetUserDetails,
} from 'src/app/shared/api/service-proxies';
import { AppToastService } from 'src/app/shared/services/app-toast.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-identity-edit',
  templateUrl: './identity-edit.component.html',
  styleUrls: ['./identity-edit.component.scss']
})
export class IdentityEditComponent implements OnInit, OnChanges {
  @ViewChild('personalizeForm', { static: false }) pForm: NgForm;
  @ViewChild('carrier', { static: true }) carrier: NgModel;
  @Output() submitEdit: EventEmitter<any> = new EventEmitter<any>();
  @Input() identity: Users;
  carriers = PERSONAL_INFO_PHONE;
  userDetails: IGetUserDetails = {

    username: 'User1',
    primaryGroup: 'Admin',
    subGroups: ['Child Group 1', 'Child Group 2'],
    valid: true,
    lastLogin: '2019-12-10 23:59:59',
    personalInfo: {
      firstName: 'User',
      lastName: 'One',
      commonName: 'User One',
      givenName: 'User',
      surname: 'One',
      mobileCarrier: 'ATT',
      phone: '(555) 867-5389',
      email: 'engineering@futurex.com'
    }
  }
  constructor(
    private usersService: UsersServiceProxy,
    private toast: AppToastService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.identity) {
      const identity = changes.identity.currentValue as Users;
      // mock enpoint does not return well-formed data
      // this.usersService.usersGet(identity.username).subscribe(res => { this.userDetails = res.responseData as GetUserDetails; });
    }
  }

  ngOnInit() {
  }

  submitEditIdentity() {
    if (this.pForm.valid) {
      this.updateUser();
      this.toast.success('Identity was updated');
    } else {
      this.markAllAsTouched(this.pForm);
      this.toast.warning('Invalid form');
    }
  }

  updateUser(): void {
    const requestData = { personalInfo: this.userDetails.personalInfo, username: this.userDetails.username };
    this.usersService
      .usersPut(
        new UpdateUser({
          action: 'update',
          requestData: { ...requestData }
        })
      )
      .subscribe(_ => {
        console.log(_);
        this.submitEdit.emit();
      });
  }

  markAllAsTouched(form: NgForm): void {
    for (const key in form.controls) {
      if (key) {
        form.controls[key].markAsTouched();
      }
    }
  }

  resetForms() {
    this.pForm.resetForm();
  }
}
