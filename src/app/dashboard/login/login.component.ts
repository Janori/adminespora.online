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

  ngOnInit() {
  }

  /**
   * Login method
   * @param login
   * @param password
   */
  login (login, password) {
      if(login != 'admin' || password != 'R3515t0l') {
          alert('Las credenciales no coinciden');
          return;
      }

      localStorage.setItem('isLogged', 'true');
      this.router.navigateByUrl('/');
  }
}
