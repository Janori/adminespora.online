import { Component, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { ResizeService } from '../resize/resize.service';
import { routerAnimation } from '../utils/page.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ routerAnimation ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // Add router animation
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
    'Crear Usuario',
    'Crear Propietario',
    'Crear Inmueble',
    'Crear Arrendatario'
  ];


  constructor(
      private _router: Router,
      public resizeService: ResizeService) {
  }

  ngOnInit() {
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
      localStorage.setItem('isLogged', 'false');
      this._router.navigate(['login']);
  }

  clickHandler = () => {
      alert('No disponible - Error en el servidor');
  }

}
