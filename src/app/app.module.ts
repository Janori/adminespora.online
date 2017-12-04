import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders} from './app.routing';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { AuthGuard, AccessGuard } from './shared/security';

import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomFormsModule} from 'ng2-validation';
import { LOCALE_ID } from '@angular/core';
import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';
import {SidemenuModule} from './sidemenu/sidemenu.module';
import {ResizeModule} from './resize/resize.module';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  PortalModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularEchartsModule} from 'ngx-echarts';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {OverlayModule} from "@angular/cdk/overlay";
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

// AoT requires an exported function for factories for translate module
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { OwlModule } from 'ngx-owl-carousel';

import { AppComponent } from './app.component';
import { LoginComponent } from './dashboard/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { DummyTableComponent } from './dashboard/dummy-table/dummy-table.component';
import { UsersComponent } from './dashboard/users/users.component';
import { UserFormComponent } from './dashboard/users/user-form.component';
import { OwnersComponent } from './dashboard/owners/owners.component';
import { OwnerFormComponent } from './dashboard/owners/owner-form.component';
import { RentersComponent } from './dashboard/renters/renters.component';
import { RenterFormComponent } from './dashboard/renters/renter-form.component';
import { ProvidersComponent } from './dashboard/providers/providers.component';
import { ProviderFormComponent } from './dashboard/providers/provider-form.component';
import { BuildingsComponent } from './dashboard/buildings/buildings.component';
import { BuildingFormComponent } from './dashboard/buildings/building-form.component';
import { BuildingDetailComponent } from './dashboard/buildings/building-detail.component';
import { BuildingRentComponent } from './dashboard/buildings/building-rent.component';
import { CancelTicketDialogComponent } from './dashboard/buildings/cancel-ticket-dialog/cancel-ticket-dialog.component';

//Servicios

import { Service } from './services';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    DummyTableComponent,
    UsersComponent,
    UserFormComponent,
    OwnersComponent,
    OwnerFormComponent,
    RentersComponent,
    RenterFormComponent,
    ProvidersComponent,
    ProviderFormComponent,
    BuildingsComponent,
    BuildingFormComponent,
    LoginComponent,
    BuildingDetailComponent,
    ConfirmDialogComponent,
    BuildingRentComponent,
    CancelTicketDialogComponent
  ],
  entryComponents: [
      ConfirmDialogComponent,
      UserFormComponent,
      OwnerFormComponent,
      RenterFormComponent,
      ProviderFormComponent,
      BuildingFormComponent,
      BuildingRentComponent,
      CancelTicketDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdCheckboxModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule,
    PortalModule,
    SidemenuModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    FlexLayoutModule,
    ReactiveFormsModule,
    CustomFormsModule,
    AngularEchartsModule,
    CovalentMediaModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    ResizeModule,
    HttpClientModule,
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
    }),
    OwlModule,
    routing
  ],
  providers: [
       { provide: LOCALE_ID, useValue: 'es-MX' },
      appRoutingProviders,
      AuthGuard, AccessGuard,
      Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
