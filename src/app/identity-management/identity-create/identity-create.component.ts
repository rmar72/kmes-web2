import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UsersServiceProxy, IPersonalInfo, PERSONAL_INFO_PHONE, UsersPostBody } from 'src/app/shared/api/service-proxies';
import { AppToastService } from 'src/app/shared/services/app-toast.service';

@Component({
  selector: 'app-identity-create',
  templateUrl: './identity-create.component.html',
  styleUrls: ['./identity-create.component.scss'],
})
export class IdentityCreateComponent implements OnInit {
  @ViewChild('personalizeForm', { static: false }) pForm: NgForm;
  @ViewChild('carrier', { static: true }) carrier: NgModel;
  @Output() submitCreate: EventEmitter<any> = new EventEmitter<any>();
  personalInfo = PERSONAL_INFO_PHONE;
  carriers: string[];
  constructor(private usersService: UsersServiceProxy, private toast: AppToastService) { }

  ngOnInit() {
  }

  submitCreateIdentity() {
    console.log(this.carrier);
    if (this.pForm.valid) {
      this.createUser();
      this.toast.success('Identity was created');
    } else {
      this.markAllAsTouched(this.pForm);
      this.toast.warning('Invalid form');
    }
  }

  createUser(): void {
    this.usersService.usersPost(new UsersPostBody({
      action: 'create',
      requestData: { personalInfo: { ...this.personalInfo } as IPersonalInfo }
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
