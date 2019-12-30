import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersServiceProxy, IPersonalInfo, PersonalInfoPhone, UsersPostBody } from 'src/app/shared/api/service-proxies';

@Component({
  selector: 'app-identity-create',
  templateUrl: './identity-create.component.html',
  styleUrls: ['./identity-create.component.scss'],
})
export class IdentityCreateComponent implements OnInit {
  @ViewChild('personalizeForm', { static: false }) pForm: NgForm;
  @Output() submitCreate: EventEmitter<any> = new EventEmitter<any>();
  personalInfo = {} as IPersonalInfo;
  carriers: PersonalInfoPhone;
  constructor(private usersService: UsersServiceProxy) {}

  ngOnInit() {}
  submitCreateIdentity() {
    this.usersService
      .usersPost(
        new UsersPostBody({
          action: 'create',
          requestData: { personalInfo: { ...this.personalInfo } }
        })
      )
      .subscribe(_ => {
        this.submitCreate.emit();
        this.resetForms();
      });
  }

  resetForms() {
    this.pForm.resetForm();
  }
}
