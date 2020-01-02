import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersServiceProxy, IPersonalInfo, PersonalInfoPhone, UsersPostBody } from 'src/app/shared/api/service-proxies';
import { AppToastService } from 'src/app/shared/services/app-toast.service';

@Component({
  selector: 'app-identity-create',
  templateUrl: './identity-create.component.html',
  styleUrls: ['./identity-create.component.scss'],
})
export class IdentityCreateComponent implements OnInit {
  @ViewChild('personalizeForm', { static: false }) pForm: NgForm;
  @Output() submitCreate: EventEmitter<any> = new EventEmitter<any>();
  personalInfo = {} as IPersonalInfo;
  carriers: string[];
  constructor(private usersService: UsersServiceProxy, private toast: AppToastService) { }

  ngOnInit() {
    this.carriers = Object.keys(PersonalInfoPhone).map(key => {
      return PersonalInfoPhone[key];
    });
  }

  submitCreateIdentity() {
    if (this.pForm.valid) {
      this.createUser();
      this.toast.show('Create Identity Successful', { classname: 'alert alert-success' });
    } else {
      this.markAllAsTouched(this.pForm);
      this.toast.show('Invalid form', { classname: 'alert alert-warning' });
    }
  }

  createUser(): void {
    this.usersService.usersPost(new UsersPostBody({
      action: 'create',
      requestData: { personalInfo: { ...this.personalInfo } }
    })).subscribe(_ => {
      this.submitCreate.emit();
      this.resetForms();
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
