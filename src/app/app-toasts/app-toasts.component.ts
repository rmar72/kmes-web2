import { Component, TemplateRef, HostBinding } from '@angular/core';
import { AppToastService } from '../shared/services/app-toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './app-toasts.component.html',
})
export class AppToastsComponent {
  @HostBinding('class.ngb-toasts') ngbToasts = 'true';

  constructor(public toastService: AppToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
