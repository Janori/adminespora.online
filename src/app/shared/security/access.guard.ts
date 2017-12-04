import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute,
         RouterStateSnapshot, CanActivate } from '@angular/router';
import { Data } from '../common/shared.data';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AccessGuard {

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              public snackBar:MdSnackBar) {
  }


  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    Data.loadFromStorage();

    if(!Data.canAccess(state.url)){
      //alert('Tu usuario no tiene acceso a esta sección');
      this.router.navigate([this.router.url]);
      //console.log(this.router.url);
      this.snackBar.open('Tu usuario no tiene acceso a esta sección', 'X', {
        duration: 5000,
      });
      return false;
    }
    return true;
  }

}
