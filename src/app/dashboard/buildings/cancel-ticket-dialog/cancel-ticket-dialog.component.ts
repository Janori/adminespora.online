import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-cancel-ticket-dialog',
  templateUrl: './cancel-ticket-dialog.component.html',
  styleUrls: ['./cancel-ticket-dialog.component.scss']
})
export class CancelTicketDialogComponent implements OnInit {
    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<CancelTicketDialogComponent>) {
    }


    ngOnInit() {
        console.log(this.data);
    }

}
