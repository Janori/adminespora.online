import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Building } from '../../shared/models';
import { MdDialog, MdSnackBar } from '@angular/material';
import { BuildingFormComponent } from './building-form.component';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss']
})
export class BuildingDetailComponent implements OnInit {
    public building: Building;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mdDialog: MdDialog,
        private _mdSnackbar: MdSnackBar
    ) { }

    ngOnInit() {
        this.getBuilding();
    }

    getBuilding = () => {
        this._route.params.forEach((params : Params) => {
            this.building = new Building({
                id: params.id,
                is_new: true,
                address: 'Calle Real #1233',
                rent_price: 5500,
                comision: 10,
                plazo_minimo: 2,
                no_depositos: 1,
                costo_mto: 500,
                habitaciones: 3,
                banos: 3,
                estacionamientos: 0,
                patios: 0,
                terreno: 3000,
                construccion: 3500,
                ano_contruccion: 1990,
                predial: 500,
            });
        });
    }

    editBuilding = (building?: Building) => {
        const dialogRef = this._mdDialog.open(BuildingFormComponent, {
            width: '700px',
            data: {
                building: building,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if(result != false) {
                this._mdSnackbar.open('Inmueble editado con éxito', 'Aceptar', {
                    duration: 2000,
                });
            }
        });
    }
}
