import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute,
         RouterStateSnapshot, CanActivate } from '@angular/router';
import { Data } from '../common/shared.data';

@Injectable()
export class AccessGuard {

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router) {
  }


  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    Data.loadFromStorage();

    var url = next.url.join('');
    if(!Data.canAccess(url)){
      alert('Tu usuario no tiene acceso a esta sección');
    }
    this.router.navigate(['./dashboard']);
    return false;
  }

}
