import { Injectable } from '@angular/core';

@Injectable()
export class ToastrService {

    constructor() { }

    showMessage: (message: string, messageType: MessageType) => number;

}

export enum MessageType {
  Success,
  Danger,
  Warning,
  Info
}
