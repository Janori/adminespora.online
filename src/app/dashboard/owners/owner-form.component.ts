import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDatepicker, MdSnackBar } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss']
})
export class OwnerFormComponent implements OnInit {

    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<OwnerFormComponent>) {
    }

    ngOnInit() {
    }

}
