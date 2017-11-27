import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
  }

}
