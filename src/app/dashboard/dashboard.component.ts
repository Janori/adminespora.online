import { Component, HostBinding, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ResizeService } from '../resize/resize.service';
import { routerAnimation } from '../utils/page.animation';
import { Router } from '@angular/router';
import { Data } from '../shared/common';
import { MdDialog, MdSnackBar } from '@angular/material';

import { User, Customer, Building } from '../shared/models';
import { UserFormComponent } from './users/user-form.component';
import { CustomerFormComponent } from './customers/customer-form.component';
import { BuildingFormComponent } from './buildings/building-form.component';

import { DashboardService } from '../shared/services/dashboard.service';
import { UserService } from '../shared/services/user.service';
import { BuildingService } from '../shared/services/building.service';
import { CustomerService } from '../shared/services/customer.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [ routerAnimation ],
    providers: [ DashboardService, UserService, CustomerService, BuildingService ]
})

export class DashboardComponent implements OnInit, AfterViewInit {
    // Add router animation
    @ViewChild('optionsnav') optionsnav;
    @HostBinding('@routerAnimation') routerAnimation = true;
    // Applying theme class
    @HostBinding('class.dark-theme') darkTheme = false;
    _sidenavMode = 'over';
    _boxedLayout = false;
    // Data for messages at popup

    public user: object = {
        name: 'Administrador Espora',
        kind: 'Administrador',
    };

    public quickActions = [
        {text: 'Crear Usuario', icon: 'people', command: 'add_user'},
        {text: 'Crear Propietario', icon: 'recent_actors', command: 'add_owner'},
        {text: 'Crear Inmueble', icon: 'location_city', command: 'add_building'},
        {text: 'Crear Arrendatario', icon: 'hotel', command: 'add_renter'},
        {text: 'Crear Proveedor', icon: 'local_shipping', command: 'add_provider'},
    ];


    constructor(
        private _router: Router,
        private _mdDialog: MdDialog,
        private _mdSnackbar: MdSnackBar,
        private _userService: UserService,
        private _customerService: CustomerService,
        private _dashboardService: DashboardService,
        private _buildingService: BuildingService,
        public resizeService: ResizeService) {
    }

    ngOnInit() {
        if(lscache.get('roles') === null) {
            this._dashboardService.getRoles().subscribe(result => {
                lscache.set('roles', result.data);
            })
        }
    }

    ngAfterViewInit(): void {
    // Resize after sidenav open on startup to draw charts correctly
    // setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
    }

    set sidenavMode(val) {
        this._sidenavMode = val;
        setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
    }
    get sidenavMode() {
        return this._sidenavMode;
    }

    set boxedLayout(val) {
        this._boxedLayout = val;
        setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
    }

    get boxedLayout() {
        return this._boxedLayout;
    }

    doLogout = () => {
        Data.logOut();
        this._router.navigate(['login']);
    }

    clickHandler = (command: string) => {
        if(command == 'add_user') {
            const dialogRef = this._mdDialog.open(UserFormComponent, {
                width: '700px',
                data: {
                    user: new User({
                        role_id: 1
                    }),
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if(result != false) {
                    this._userService.create(result).subscribe(result => {
                        this._mdSnackbar.open('no', 'Aceptar', {
                            duration: 2000,
                        });
                    });
                }
            });
        } else if(command == 'add_building') {
            const dialogRef = this._mdDialog.open(BuildingFormComponent, {
                width: '700px',
                data: {
                    building: new Building(),
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if(result != false) {
                    this._buildingService.create(result).subscribe(result => {
                        this._mdSnackbar.open('Inmueble añadido con éxito', 'Aceptar', {
                            duration: 2000,
                        });
                    });
                }
            });
        } else {
            var kind = null;

            switch (command) {
                case 'add_owner':
                    kind = Customer.KIND.OWNER;
                    break;
                case 'add_renter':
                    kind = Customer.KIND.RENTER;
                    break;
                case 'add_provider':
                    kind = Customer.KIND.RENTER;
                    break;
            }

            const dialogRef = this._mdDialog.open(CustomerFormComponent, {
                width: '700px',
                data: {
                    customer: new Customer({
                        kind: kind
                    })
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if(result != false) {
                    this._customerService.create(result).subscribe(result => {
                        if(result.status) {
                            this._mdSnackbar.open(result.msg, 'Aceptar', {
                                duration: 2000,
                            });
                        }
                    });
                }
            });
        }

        this.optionsnav.close();

    }

}
