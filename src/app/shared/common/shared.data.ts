import { User } from '../models/User';

export class Data{
  static user:User;
  static token:string;
  static access:any = {};

  private static ignoreRoutes = ['home'];

  public static isLoggedIn() : boolean{
    let token:string = localStorage.getItem('auth_token');
    let expiration_token:string = localStorage.getItem('expiration_token');
    if(token && expiration_token){
      let expireTime = new Date(expiration_token);
      if(expireTime.getTime() - new Date().getTime() > 0){
        return true;
      }
    }else{
      return false;
    }
  }

  public static loadFromStorage(force:boolean = false){
    if((!Data.access || JSON.stringify(Data.access) === JSON.stringify({})) || force){
      //console.log(localStorage.getItem('access'));
      Data.access = JSON.parse(localStorage.getItem('access'));
    }
    if((!Data.token || Data.token === '') || force)
      Data.token = localStorage.getItem('token');

    if(!Data.user || force){
      Data.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  public static canAccess(path:string) : boolean{
    for(let r of Data.ignoreRoutes){
      if(r === path){
        return true;
      }
    }
    for(let a of Data.access){
      let rgx = new RegExp(a.path_regex);
      console.log(a.path_regex);
      if(rgx.test(path)) return true;
    }
    return false;
  }

  public static canUse(code:string) : boolean{
    for(let a of Data.access){
      if(a.code.indexOf(code) > -1 && (a.code.length - code.length) < 2 ){
        return true;
      }
    }
    return false;
  }

}
