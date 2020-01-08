import { Component, TemplateRef, HostBinding, ViewEncapsulation } from '@angular/core';
import { AppToastService } from '../shared/services/app-toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './app-toasts.component.html',
  styleUrls: ['./app-toasts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppToastsComponent {
  @HostBinding('class.ngb-toasts') get ngbToasts() { return true; }

  constructor(public toastService: AppToastService) {}

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }

}
