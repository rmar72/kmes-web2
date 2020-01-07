import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
  warning(text: string, options: any = {}) {
    options = { ...options, classname: 'alert alert-warning'};
    const warning = `Warning! ${text}  `;
    this.toasts.push({ textOrTpl: warning, ...options });
  }

  success(text: string, options: any = {}) {
    options = { ...options, classname: 'alert alert-success'};
    const success = `Success! ${text}   `;
    this.toasts.push({ textOrTpl: success, ...options });
  }

  error(text: string, options: any = {}) {
    options = { ...options, classname: 'alert alert-error'};
    const success = `Error! ${text}   `;
    this.toasts.push({ textOrTpl: success, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
