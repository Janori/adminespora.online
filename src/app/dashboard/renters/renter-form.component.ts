import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDatepicker, MdSnackBar } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-renter-form',
  templateUrl: './renter-form.component.html',
  styleUrls: ['./renter-form.component.scss']
})
export class RenterFormComponent implements OnInit {

    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<RenterFormComponent>) {
    }

    ngOnInit() {
    }

}
