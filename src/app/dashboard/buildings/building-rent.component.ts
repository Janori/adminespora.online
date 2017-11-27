import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Renter, Rent } from '../../shared/models';
import 'rxjs/add/operator/startWith';

@Component({
    selector: 'app-building-rent',
    templateUrl: './building-rent.component.html',
    styleUrls: ['./building-rent.component.scss']
})

export class BuildingRentComponent implements OnInit {
    public renters: Renter[];
    public rent: Rent;
    public renterCtrl: FormControl;
    public filteredRenters: any;

    constructor(
        @Inject(MD_DIALOG_DATA) public data: any,
        public dialogRef: MdDialogRef<BuildingRentComponent>
    ) {
    }

    ngOnInit() {
        this.rent = new Rent({
            // owner: this.data.building.owner,
            owner_id: this.data.building.owner_id,
            precio_minimo: this.data.building.rent_price,
        });
        this.getRenters();
        console.log(this.rent);
    }

    getRenters = () => {
        this.renters = [
            new Renter({
                id: Math.floor((Math.random() * 1000) + 1),
                name: 'Alejandro',
                first_surname: 'Gori',
                address: 'Calle real #' + Math.floor((Math.random() * 1000) + 1),
                phone: '333' + Math.floor((Math.random() * 1000) + 1) +  '082',
            })
        ];

        this.renterCtrl = new FormControl();
        this.filteredRenters = this.renterCtrl.valueChanges
          .startWith(null)
          .map(name => this.filterRenters(name));
    }

    filterRenters = (val: string) => val ? this.renters.filter((r) => new RegExp(val, 'gi').test(r.full_name)) : this.renters;

}
