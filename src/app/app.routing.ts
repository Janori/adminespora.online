import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/security/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { DummyTableComponent } from './dashboard/dummy-table/dummy-table.component';
import { UsersComponent } from './dashboard/users/users.component';
import { OwnersComponent } from './dashboard/owners/owners.component';
import { RentersComponent } from './dashboard/renters/renters.component';
import { ProvidersComponent } from './dashboard/providers/providers.component';
import { BuildingsComponent } from './dashboard/buildings/buildings.component';
import { BuildingDetailComponent } from './dashboard/buildings/building-detail.component';
import { LoginComponent } from './dashboard/login/login.component';

const appRoutes : Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'usuarios', component: UsersComponent },
            { path: 'propietarios', component: OwnersComponent },
            {
                path: 'inmuebles',
                children: [
                    { path: '', component: BuildingsComponent },
                    { path: ':id', component: BuildingDetailComponent },
                ]
            },
            { path: 'arrendatarios', component: RentersComponent },
            { path: 'proveedores', component: ProvidersComponent },
        ],
        canActivate: [ AuthGuard ]
    },
    { path: '**', component: DashboardComponent }
];

export const appRoutingProviders: Array<any> = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
