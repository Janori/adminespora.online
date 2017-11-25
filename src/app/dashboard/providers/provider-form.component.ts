import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDatepicker, MdSnackBar } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent implements OnInit {

    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<ProviderFormComponent>) {
    }

    ngOnInit() {
    }

}
