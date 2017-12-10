import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerAnimation} from '../../utils/page.animation';
import {Service} from '../../shared/services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerAnimation]
})
export class LoginComponent implements OnInit {
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;
  constructor(private router: Router,
              private service:Service) { }

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

      this.service.getNewtoken(login, password).subscribe(res => {
        if(res === true){
          this.router.navigateByUrl('/');
          this.isLogging = false;
        }else{
          if(res !== false){
            console.error('LogErr', res);
          }
          this.isLogging = false;
          this.error = true;
        }
      }, error=>{
        console.error('LogReq', error);
        this.error = true;
        this.isLogging = false;
      });

      //localStorage.setItem('isLogged', 'true');
      //this.router.navigateByUrl('/');
  }
}
