import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StepState, TdMediaService } from '@covalent/core';
import { Building, Renter, Rent, Ticket } from '../../shared/models';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdSnackBar } from '@angular/material';
import { BuildingFormComponent } from './building-form.component';
import { BuildingRentComponent } from './building-rent.component';
import { CancelTicketDialogComponent } from './cancel-ticket-dialog/cancel-ticket-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components';
import { FormControl } from '@angular/forms';
import { BuildingService } from '../../shared/services/building.service';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss'],
  providers: [ BuildingService ]
})

export class BuildingDetailComponent implements OnInit {
    public building: Building;
    public isScreenGtSm: boolean = false;
    public querySubscription: Subscription;
    public renters: Renter[];
    public renterCtrl: FormControl;
    public filteredRenters: any;

    public stateStep1: StepState = StepState.Required;
    public stateStep2: StepState = StepState.None;
    public stateStep3: StepState = StepState.None;

    public disabledStep1: boolean = true;
    public disabledStep2: boolean = true;
    public disabledStep3: boolean = true;

    public activeStep1: boolean = true;
    public activeStep2: boolean = false;
    public activeStep3: boolean = false;

    public files: any;

    public activeTabIndex: number = 0;
    public dynamicTabs: any = [
    ];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mdDialog: MdDialog,
        private _mdSnackbar: MdSnackBar,
        private _mediaService: TdMediaService,
        private _ngZone: NgZone,
        private _buildingService: BuildingService
    ) { }

    ngOnInit() {
        this.watchScreen();
        this.getBuilding();
        this.getRenters();
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
            if(result != false) {
                this._buildingService.edit(result).subscribe(result => {
                    if(result.status)
                        this._mdSnackbar.open('Inmueble editado con éxito', 'Aceptar', {
                            duration: 2000,
                        });
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
            if(result == true) {
                this._buildingService.delete(building).subscribe(result => {
                    if(result.status) {
                        this._mdSnackbar.open('Registro eliminado con éxito', 'Aceptar', {
                            duration: 2000,
                        });

                        this._router.navigate(['/', 'inmuebles']);
                    }
                }, error => {
                    this._mdSnackbar.open('Hubo un error en el servidor', 'Aceptar', {
                        duration: 2000,
                    });
                });
            }
        });
    }

    rentBuilding = (building?: Building) => {
        this.building.rent = new Rent({
            // owner: this.data.building.owner,
            owner_id: this.building.owner_id,
            precio_minimo: this.building.rent_price,
        });
        this.getRenters();
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

    contractGenerate = () => {
        this.building.rent.document_url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        this.stateStep1 = StepState.Complete;
        this.stateStep2 = StepState.Complete;
        this.disabledStep2 = false;
        this.disabledStep3 = false;

        this.activeStep1 = false;
        this.activeStep2 = true;
    }

    uploadFiles = () => {
        let title = `El contrato de arrendamiento será completado`;
        let msg = '¿Estás seguro que el archivo de contrato es correcto?'
        const dialogRef = this._mdDialog.open(ConfirmDialogComponent, {
            data: {
                title: title,
                msg: msg,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result)
                this.building.rent.id = 1;
        });
    }

    addTicket = () => {
        let ticket_id = Math.floor((Math.random() * 1000) + 1);
        this.dynamicTabs.push({
            label: 'Ticket #' + ticket_id,
            data: new Ticket({
                id: ticket_id
            })
        });

        this.activeTabIndex = this.dynamicTabs.length - 1;
    }

    goToStep = (actualStep: any, nextStep: any) => {
        actualStep.state        = StepState.Complete;
        nextStep.disabled       = false;
        nextStep.active         = true;
    }

    finishTicket = (index: number) => {
        const dialogRef = this._mdDialog.open(CancelTicketDialogComponent, {
            data: {
                ticket: this.dynamicTabs[index]
            }
        });
    }

    cancelarTicket = (index: number) => {
        const dialogRef = this._mdDialog.open(CancelTicketDialogComponent, {
            data: {
                ticket: this.dynamicTabs[index].data
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result == true) {
                this._mdSnackbar.open('Ticket cancelado correctamente', 'Aceptar', {
                    duration: 2000,
                });

                this.dynamicTabs.splice(index, 1);

                console.log(this.dynamicTabs);
            }
        });
    }
}
