import { Component, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { ResizeService } from '../resize/resize.service';
import { routerAnimation } from '../utils/page.animation';

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
  _sidenavMode = 'side';
  _boxedLayout = false;
  // Data for messages at popup
  messages = [
    {
      subject: 'Monthly report',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'assets/avatars/4040.png',
      time: '18:05'
    },
    {
      subject: 'Holiday party',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'assets/avatars/4040.png',
      time: '3 hrs ago'
    },
    {
      subject: 'Salary bonus',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'assets/avatars/4040.png',
      time: '2 days ago'
    }
  ];


  constructor(public resizeService: ResizeService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // Resize after sidenav open on startup to draw charts correctly
    setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
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

}
