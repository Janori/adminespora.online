import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Data} from '../common/shared.data';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router:Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // if(Data.isLoggedIn()){
        return true;
      // }else{
      //   this.router.navigate(['login']);
      //   return false;
      // }
        // if(localStorage.getItem('isLogged') != null && localStorage.getItem('isLogged') == 'true')


        // this._router.navigate(['login']);
        // return false;
    }

}
