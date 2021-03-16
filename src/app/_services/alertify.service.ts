import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  confirm(message: string, okCallback: () => any): void {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(message: string): void {
    alertify.success(message);
  }

  error(message: string): void {
    alertify.error(message);
  }

  warning(message: string): void {
    alertify.warning(message);
  }

  message(message: string): void {
    alertify.message(message);
  }
}
