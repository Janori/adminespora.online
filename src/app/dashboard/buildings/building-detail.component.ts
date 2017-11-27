import { Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StepState, TdMediaService } from '@covalent/core';
import { Building } from '../../shared/models';
import {Subscription} from 'rxjs/Subscription';
import { MdDialog, MdSnackBar } from '@angular/material';
import { BuildingFormComponent } from './building-form.component';
import { BuildingRentComponent } from './building-rent.component';
import { ConfirmDialogComponent } from '../../shared/components';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss']
})
export class BuildingDetailComponent implements OnInit {
    public building: Building;
    public isScreenGtSm: boolean = false;
    public querySubscription: Subscription;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mdDialog: MdDialog,
        private _mdSnackbar: MdSnackBar,
        private _mediaService: TdMediaService,
        private _ngZone: NgZone
    ) { }

    ngOnInit() {
        this.watchScreen();
        this.getBuilding();
    }

    ngOnDestroy(): void {
      this.querySubscription.unsubscribe();
    }

    /**
     * Change stepper layout if screen width changes
     */
    watchScreen(): void {
        this._ngZone.run(() => {
            this.isScreenGtSm = this._mediaService.query('gt-sm');
        });
        this.querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
            this._ngZone.run(() => {
                this.isScreenGtSm = matches;
            });
        });
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
                owner_id: 12
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

    deleteBuilding = (building?: Building) => {
        let title = `Se va a eliminar el inmueble ${building.id}`;
        let msg = '¿Estás seguro que deseas eliminar este inmueble?'
        const dialogRef = this._mdDialog.open(ConfirmDialogComponent, {
            data: {
                title: title,
                msg: msg,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    rentBuilding = (building?: Building) => {
        const dialogRef = this._mdDialog.open(BuildingRentComponent, {
            width: '700px',
            data: {
                building: building,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(typeof result != undefined) {
                if(result !== false) {
                    this._mdSnackbar.open('¿Apoco sí carnal?', 'Aceptar');
                }
            }
        });
    }
}
