import { Component, OnInit, Inject, ViewChild, Pipe } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.scss']
})
export class BuildingFormComponent implements OnInit {
    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<BuildingFormComponent>) {
    }

    ngOnInit() {
    }
}
