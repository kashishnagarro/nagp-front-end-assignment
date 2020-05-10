import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ToastrService, MessageType } from './toastr.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'gm-toastr',
  template: `
    <div [ngClass]="position" class="toastr">
      <div *ngFor="let msg of toastMessages" [ngClass]="{active: msg.enabled}"
          class="toast alert {{ msg.messageType }}">
          <span class="toast-message">{{ msg.message }}</span>
      </div>
    </div>
  `,
  styleUrls: ['toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  private toastCount = 0;
  toastMessages: Toast[] = [];

  @Input() position = 'bottom-right';
  @Input() timeout = 3000;

  constructor(private toastrService: ToastrService,
              private logger: LoggerService) {
    toastrService.showMessage = this.showToast.bind(this);
  }

  ngOnInit() { }

  showToast(message: string, messageType: MessageType): number {
    this.toastCount++;
    const bootstrapAlertType = MessageType[messageType].toLowerCase();
    const toastMessageType = `alert-${bootstrapAlertType}`;

    const toast = new Toast(this.toastCount, message, toastMessageType, this.timeout, this);
    this.toastMessages.push(toast);
    return toast.id;
  }

  removeToast(id: number) {
    this.toastMessages.forEach((toast: Toast, index: number) => {
      if (toast.id === id) {
        this.toastMessages.splice(index, 1);
        this.toastCount--;
        this.logger.log('removed ' + id);
      }
    });
  }
}

class Toast {

  enabled: boolean;
  timeoutId: number;

  constructor(public id: number,
    public message: string,
    public messageType: string,
    private timeout: number,
    private messageContainer: ToastrComponent) {
    this.show();
  }

  show() {
    window.setTimeout(() => {
      this.enabled = true;
      this.setTimeout();
    }, 0);
  }

  setTimeout() {
    window.setTimeout(() => {
      this.hide();
    }, this.timeout);
  }

  hide() {
    this.enabled = false;
    window.setTimeout(() => {
      this.messageContainer.removeToast(this.id);
    }, this.timeout);
  }

}
