import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<NotificationsComponent>) { }

  ngOnInit() {
  }

}
