import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private _router:Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if(localStorage.getItem('isLogged') != null && localStorage.getItem('isLogged') == 'true')
            return true;

        // this._router.navigate(['login']);
        // return false;
    }

}
