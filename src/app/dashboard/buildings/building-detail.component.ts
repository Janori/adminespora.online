import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StepState, TdMediaService } from '@covalent/core';
import { Building, Ticket, Customer, Renter, Provider } from '../../shared/models';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdSnackBar } from '@angular/material';
import { BuildingFormComponent } from './building-form.component';
import { BuildingRentComponent } from './building-rent.component';
import { CancelTicketDialogComponent } from './cancel-ticket-dialog/cancel-ticket-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components';
import { FormControl } from '@angular/forms';
import { BuildingService, RentsService, CustomerService, TicketsService } from '../../shared/services';
import { NgxCarousel } from 'ngx-carousel';

@Component({
    selector: 'app-building-detail',
    templateUrl: './building-detail.component.html',
    styleUrls: ['./building-detail.component.scss'],
    providers: [ BuildingService, RentsService, CustomerService, TicketsService ],
    encapsulation: ViewEncapsulation.None
})

export class BuildingDetailComponent implements OnInit {
    public building: Building;
    public isScreenGtSm: boolean = false;
    public querySubscription: Subscription;
    public renters: Customer[];
    public providers: Provider[];
    public renterCtrl: FormControl;
    public requesterCtrl: FormControl;
    public providerCtrl: FormControl;
    public filteredRenters: any[];
    public filteredProviders: any[];

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
        private _buildingService: BuildingService,
        private _rentsService: RentsService,
        private _customerService: CustomerService,
        private _ticketsService: TicketsService,
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
        this.getRenters();
    }

    displayRenter(val: any) {
      return val ? val.full_name : val;
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
                if(this.building.is_rented == true){
                  this.firstStepEnded();
                  this.stateStep3 = StepState.Complete;
                  this.activeStep2 = false;
                  this.activeStep3 = true;
                }else if(this.building.rent && this.building.rent.status == 'p'){
                  this.firstStepEnded();
                }
                this.setTickets();

            });
        });
    }

    setTickets(){
      this.dynamicTabs = [];
      console.log(this.building.tickets);
      if(!this.building.tickets || this.building.tickets == null) return;
      for(let t of this.building.tickets){
        this.dynamicTabs.push({
            label: 'Ticket # ' + t.id,
            data: t,
            state: this.checkTicketStatus(t)
        });
      }
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

    getRenters(){
        this.renters = [];
        this._customerService.search('c', null)
                             .subscribe(res=>{
          if(res && res != null)
            this.renters = this.renters.concat(res.data.map(x=> new Customer(x)));
        }, error=>{
          console.error(error);
        });

        this._customerService.search('o', null)
                             .subscribe(res=>{
          if(res && res != null)
            this.renters = this.renters.concat(res.data.map(x=> new Customer(x)));
        }, error=>{
          console.error(error);
        });

        this._customerService.search('p', null)
                             .subscribe(res=>{
          if(res && res != null)
            this.providers = res.data.map(x=> new Provider(x));
          else this.providers = [];
        }, error=>{
          console.error(error);
        });

        if(!(this.renterCtrl || this.renterCtrl != null)){
          this.renterCtrl = new FormControl();
          this.renterCtrl.valueChanges
            .startWith(null)
            .debounceTime(300)
            .map(name => { return this.filterRenters(name)}).subscribe();
        }
        if(!(this.requesterCtrl || this.requesterCtrl != null)){
          this.requesterCtrl = new FormControl();
          this.requesterCtrl.valueChanges
            .startWith(null)
            .debounceTime(300)
            .map(name => { return this.filterRenters(name)}).subscribe();
        }
        if(!(this.providerCtrl || this.providerCtrl != null)){
          this.providerCtrl = new FormControl();
          this.providerCtrl.valueChanges
            .startWith(null)
            .debounceTime(300)
            .map(name => { return this.filterProviders(name)}).subscribe();
        }

    }

    isDownloading = false;
    downloadFile(){
      this.isDownloading = true;
      // let event = new MouseEvent('click', {bubbles: true});
      // event.stopPropagation();
      var tabWindowId = window.open('about:blank', '_blank');
      this._rentsService.downloadContract(this.building.rent.id).subscribe(file=>{
        this.isDownloading = false;
        let blob = new Blob([file.arrayBuffer()], { type: 'application/pdf' });

        let fileURL = window.URL.createObjectURL(blob);

        // let link = document.createElement('a');
        // link.target = tabWindowId;
        // link.href = fileURL;
        // link.setAttribute('visibility', 'hidden');
        // link.click();
        tabWindowId.location.href = fileURL;
      }, error=>{
        this.isDownloading = false;
        let title = `Contrato no encontrado.`;
        let msg = 'Puede que el contrato haya sido eliminado manualmente o no exista.'
        const dialogRef = this._mdDialog.open(ConfirmDialogComponent, {
            data: {
                title: title,
                msg: msg,
            }
        });
      });
    }

    filterRenters(val: string){
      if(!val || val == null) this.filteredRenters = this.renters;
      if(!this.filteredRenters || this.renters == null) this.filteredRenters = this.renters;
      else this.filteredRenters = this.renters.filter(r => { return new RegExp(val, 'gi').test(r.full_name); });
    }
    filterProviders(val: string){
      console.log('filtrando')
      if(!val || val == null) this.filteredProviders = this.providers;
      if(!this.filteredProviders || this.providers == null) this.filteredProviders = this.providers;
      else this.filteredProviders = this.providers.filter(r => { return new RegExp(val, 'gi').test(r.full_name); });
    }

    //renter:any;
    contractGenerate() {
        //this.building.rent.contract_path = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        //console.log('hola que tal :)');

        console.log(this.building);
        let o = {
        	renter_id:this.building.rent.renter.id,
        	building_id: this.building.id,
        	price: this.building.rent.price,
        	rent_period: this.building.rent.rent_period,
        	start_date: (new DatePipe('es-ES').transform(this.building.rent.start_date, 'yyyy-MM-ddT00:00:00.000'))
        }
        this._rentsService.init(o).subscribe(res=>{
          this._mdSnackbar.open('Datos guardados correctamente.', 'ok');
          //console.log(res);
        }, error=>{
          this._mdSnackbar.open('Ocurrió un error al guardar los datos.', 'ok');
          console.error(error);
        });
        this.firstStepEnded();
    }

    checkTicketStatus(ticket:Ticket){
      if(ticket == null){
        let s = new typeState();
        s.active = true;
        s.disabled = false;
        return [s,new typeState(),new typeState(),new typeState()];
      }
      let active = ticket.getActiveStep() - 1;
      var state:typeState[] = [];
      console.log(active);
      for(let i of [0,1,2,3]){
        state[i] = new typeState();
        if(i < active) state[i].state = StepState.Complete;
        state[i].active = (active == i);
        state[i].disabled = i > active;
      }
      return state;
    }

    firstStepEnded(){
      this.stateStep1 = StepState.Complete;
      this.stateStep2 = StepState.Complete;
      this.disabledStep2 = false;
      this.disabledStep3 = false;

      this.activeStep1 = false;
      this.activeStep2 = true;

    }

    uploadFiles = (isFacturable: boolean) => {
        let title = `El contrato de arrendamiento será completado`;
        let msg = '¿Estás seguro que el archivo de contrato es correcto?'
        const dialogRef = this._mdDialog.open(ConfirmDialogComponent, {
            data: {
                title: title,
                msg: msg,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
              this._rentsService.finalize(this.building.rent.id, this.files, isFacturable).subscribe(res=>{
                this._mdSnackbar.open('Renta finalizada correctamente.','ok');
                //console.log(res);
              }, error=>{
                this._mdSnackbar.open('Ocurrió un error al finalizar la renta.','ok');
                console.log(error);
              });
            }
        });
    }

    addTicket(){
      this.dynamicTabs.push({
          label: 'Ticket # ?',
          data: new Ticket(),
          state: this.checkTicketStatus(null)
      });
      this.activeTabIndex = this.dynamicTabs.length - 1;
    }

    goToStep = (actualStep: any, nextStep: any) => {
        actualStep.state        = StepState.Complete;
        nextStep.disabled       = false;
        nextStep.active         = true;
    }

    startTicket(t1, t2, data){
      this.goToStep(t1, t2);
      this._ticketsService.startTicket(data.data, data.requester.id, this.building.id, data.facturable).subscribe(x=>{
        console.log(x);
        data.id = x.data.id;
        this._mdSnackbar.open('Ticket iniciado correctamente', 'Aceptar', {
          duration: 2000,
        });
      }, error=>{
        console.error(error);
        this._mdSnackbar.open('Ocurrió un error al iniciar este ticket', 'Aceptar', {
          duration: 2000,
        });
      });
    }

    sendTicket(t1, t2, data){
      console.log(data);
      this.goToStep(t1, t2);
      this._ticketsService.quoteTicket(data.id, data.provider.id, data.provider_cost, data.price, data.estimated_weeks).subscribe(x=>{
        this._mdSnackbar.open('Cotización enviada correctamente', 'Aceptar', {
          duration: 2000,
        });
      }, error=>{
        console.error(error);
        this._mdSnackbar.open('Ocurrió un error al enviar este ticket', 'Aceptar', {
          duration: 2000,
        });
      })
    }

    finishTicket = (index: number, finalized:boolean = null) => {
        let data = this.dynamicTabs[index].data;
        const dialogRef = this._mdDialog.open(CancelTicketDialogComponent, {
          data: {
            title: 'Por favor, ingresa un comentario antes de finalizar el ticket.',
            ticket: data
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result && result == true){
            console.log(data);
            this._ticketsService.closeTicket(data.id, data.extra, finalized ? 'f' : null).subscribe(res=>{
              this._mdSnackbar.open('Ticket finalizado correctamente', 'Aceptar', {
                duration: 2000,
              });
              this.dynamicTabs.splice(index, 1);
            }, error=>{
              console.error(error);
              this._mdSnackbar.open('Ocurrió un error al finalizar el ticket', 'Aceptar', {
                duration: 2000,
              });
            });
          }
        });
    }

    cancelarTicket = (index: number) => {
      let data = this.dynamicTabs[index].data;
      const dialogRef = this._mdDialog.open(CancelTicketDialogComponent, {
        data: {
          title: 'Por favor, escribe las razones por las cuales estás cancelando este ticket.',
          ticket: data
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result && result == true){
          console.log(data);
          this._ticketsService.closeTicket(data.id, data.extra, 'x').subscribe(res=>{
            this._mdSnackbar.open('Ticket cancelado correctamente', 'Aceptar', {
              duration: 2000,
            });
            this.dynamicTabs.splice(index, 1);
          }, error=>{
            console.error(error);
            this._mdSnackbar.open('Ocurrió un error al cancelar el ticket', 'Aceptar', {
              duration: 2000,
            });
          });
        }
      });
    }
}

class typeState{
  state:any;
  active:any;
  disabled:any;

  constructor(){
    this.active= false;
    this.disabled= true;
  }
}
