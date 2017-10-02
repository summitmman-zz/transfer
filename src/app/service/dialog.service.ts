import { NotificationsComponent } from './../notifications/notifications.component';
import { MdDialogRef } from '@angular/material/dialog';
import { MdDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

  private dialogRef: MdDialogRef<NotificationsComponent>;
  constructor(private dialog: MdDialog) { }
  private isOpen: boolean = false;

  open() {
    this.dialogRef = this.dialog.open(NotificationsComponent, {
      height: '400px',
      width: '300px',
      position: { top: '58px', right: '8px' },
      backdropClass: 'notification-dialog'
    });
    return this.dialogRef.afterClosed();
  }

  close() {
    this.dialogRef.close();
  }
}