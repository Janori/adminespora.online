import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions, BrowserXhr, BaseRequestOptions, ResponseOptions, BaseResponseOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';

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
  MdDatepickerModule, MdNativeDateModule,
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


import { Service } from './shared/services';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

import { DndDirective } from './shared/directives/dnd.directive';

import { AppComponent } from './app.component';
import { LoginComponent } from './dashboard/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { UsersComponent } from './dashboard/users/users.component';
import { UserFormComponent } from './dashboard/users/user-form.component';
import { BuildingsComponent } from './dashboard/buildings/buildings.component';
import { BuildingFormComponent } from './dashboard/buildings/building-form.component';
import { BuildingDetailComponent } from './dashboard/buildings/building-detail.component';
import { BuildingRentComponent } from './dashboard/buildings/building-rent.component';
import { CancelTicketDialogComponent } from './dashboard/buildings/cancel-ticket-dialog/cancel-ticket-dialog.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { CustomerFormComponent } from './dashboard/customers/customer-form.component';

export function _createDefaultCookieXSRFStrategy() {
    return new CookieXSRFStrategy();
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new Http(xhrBackend, requestOptions);
}

@NgModule({
  declarations: [
    DndDirective,
    AppComponent,
    DashboardComponent,
    HomeComponent,
    UsersComponent,
    UserFormComponent,
    BuildingsComponent,
    BuildingFormComponent,
    LoginComponent,
    BuildingDetailComponent,
    ConfirmDialogComponent,
    BuildingRentComponent,
    CancelTicketDialogComponent,
    CustomersComponent,
    CustomerFormComponent
  ],
  entryComponents: [
      ConfirmDialogComponent,
      UserFormComponent,
      CustomerFormComponent,
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
    MdDatepickerModule, MdNativeDateModule, 
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
    NgxCarouselModule,
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
      Service,
      {provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions]},
      BrowserXhr,
      {provide: RequestOptions, useClass: BaseRequestOptions},
      {provide: ResponseOptions, useClass: BaseResponseOptions},
      XHRBackend,
      {provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
