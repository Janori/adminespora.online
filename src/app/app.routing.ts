import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './shared/security/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { DummyTableComponent } from './dashboard/dummy-table/dummy-table.component';

const appRoutes : Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'usuarios', component: DummyTableComponent },
            { path: 'propietarios', component: DummyTableComponent },
            { path: 'inmuebles', component: DummyTableComponent },
            { path: 'arrendatarios', component: DummyTableComponent },
            { path: 'proveedores', component: DummyTableComponent },
        ]
    },
    { path: '**', component: DashboardComponent }
];

export const appRoutingProviders: Array<any> = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
