import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerAnimation} from '../../utils/page.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerAnimation]
})
export class LoginComponent implements OnInit {
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;
  constructor(private router: Router) { }

  isLogging = false;
  error = false;

  ngOnInit() {
  }

  /**
   * Login method
   * @param login
   * @param password
   */
  login (login, password) {
      this.isLogging = true;
      this.error = false;

      if(login != 'admin' || password != 'R3515t0l') {
          this.isLogging = false;
          this.error = true;
          return;
      }
      this.isLogging = false;

      //localStorage.setItem('isLogged', 'true');
      //this.router.navigateByUrl('/');
  }
}
