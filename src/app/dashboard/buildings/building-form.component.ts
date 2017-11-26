import { Component, OnInit, Inject, ViewChild, Pipe } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MD_DIALOG_DATA, MdDatepicker, MdSnackBar } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { OwlCarousel } from 'ng2-owl-carousel';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.scss']
})
export class BuildingFormComponent implements OnInit {
    public images =  [
        'assets/photo-1462396240927-52058a6a84ec.jpg'
    ];
    @ViewChild('owlElement') owlElement: OwlCarousel;
    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      private _sanitizer: DomSanitizer ,
      public dialogRef: MdDialogRef<BuildingFormComponent>) {
    }

    ngOnInit() {
        console.log(this.images);
    }

    getBackground = (image) => {
        return this. _sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }
}
