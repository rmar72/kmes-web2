import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import {
  UsersServiceProxy,
  IPersonalInfo,
  PersonalInfoPhone,
  UpdateUser,
} from 'src/app/shared/api/service-proxies';
import { AppToastService } from 'src/app/shared/services/app-toast.service';

@Component({
  selector: 'app-identity-edit',
  templateUrl: './identity-edit.component.html',
  styleUrls: ['./identity-edit.component.scss']
})
export class IdentityEditComponent implements OnInit {
  @ViewChild('personalizeForm', { static: false }) pForm: NgForm;
  @ViewChild('carrier', { static: true }) carrier: NgModel;
  @Output() submitEdit: EventEmitter<any> = new EventEmitter<any>();
  personalInfo = {} as IPersonalInfo;
  username = '';
  carriers: string[];
  constructor(
    private usersService: UsersServiceProxy,
    private toast: AppToastService
  ) {}

  ngOnInit() {
    this.carriers = Object.keys(PersonalInfoPhone).map(key => {
      return PersonalInfoPhone[key];
    });
  }

  submitEditIdentity() {
    console.log(this.carrier);
    if (this.pForm.valid) {
      this.updateUser();
      this.toast.success('Identity was updated');
    } else {
      this.markAllAsTouched(this.pForm);
      this.toast.warning('Invalid form');
    }
  }

  updateUser(): void {
    const requestData = {personalInfo: this.personalInfo, username: this.username};
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
