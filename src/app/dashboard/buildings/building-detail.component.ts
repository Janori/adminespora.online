import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StepState, TdMediaService } from '@covalent/core';
import { Building, Ticket, Customer } from '../../shared/models';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdSnackBar } from '@angular/material';
import { BuildingFormComponent } from './building-form.component';
import { BuildingRentComponent } from './building-rent.component';
import { CancelTicketDialogComponent } from './cancel-ticket-dialog/cancel-ticket-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components';
import { FormControl } from '@angular/forms';
import { BuildingService } from '../../shared/services/building.service';
import { NgxCarousel } from 'ngx-carousel';

@Component({
    selector: 'app-building-detail',
    templateUrl: './building-detail.component.html',
    styleUrls: ['./building-detail.component.scss'],
    providers: [ BuildingService ],
    encapsulation: ViewEncapsulation.None
})

export class BuildingDetailComponent implements OnInit {
    public building: Building;
    public isScreenGtSm: boolean = false;
    public querySubscription: Subscription;
    public renters: Customer[];
    public renterCtrl: FormControl;
    public filteredRenters: any;

    public carouselOne: NgxCarousel;
    public carouselTileItems: Array<any>;

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
    ) {
        this.building = new Building();
    }

    ngOnInit() {
        this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        this.carouselOne = {
            grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
            slide: 1,
            speed: 400,
            interval: 4000,
            point: {
            visible: true
            },
            load: 2,
            touch: true,
            loop: true,
            custom: 'banner'
        }

        this.watchScreen();
        this.getBuilding();
        //this.getRenters();
    }

    myfunc(event: Event) {
     // carouselLoad will trigger this funnction when your load value reaches
     // it is helps to load the data by parts to increase the performance of the app
     // must use feature to all carousel
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
            let id = params['id'];

            this._buildingService.getOne(id).subscribe(result => {
                this.building = new Building(result.data);
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
        this.getRenters();
    }

    getRenters = () => {

        this.renters = [
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
