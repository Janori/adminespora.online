import { User } from '../models/User';

export class Data{
  static user:User;
  static token:string;
  static access:any = {};
  static expire_token:string;

  private static ignoreRoutes = ['^/$', '^$', '.*'];

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

  public static logOut(){
    localStorage.clear();
    this.clear();
  }
  private static clear(){
    this.user = null;
    this.token = null;
    this.access = null;
  }

  public static loadFromStorage(force:boolean = false){
    if(force){
      this.clear();
    }
    if((!Data.access || JSON.stringify(Data.access) === JSON.stringify({})) || force){
      let perms = localStorage.getItem('perms');
      if(perms != null) Data.access = JSON.parse(perms);
    }
    if((!Data.token || Data.token === '') || force)
      Data.token = localStorage.getItem('auth_token');
    if((!Data.expire_token || Data.expire_token == null) || force) Data.expire_token = localStorage.getItem('expiration_token');
    if((!Data.user || JSON.stringify(Data.user) === JSON.stringify({})) || force){
      let user = localStorage.getItem('user');
      if(user != null) Data.user = JSON.parse(user);
    }
  }

  public static canAccess(path:string) : boolean{
    for(let r of Data.ignoreRoutes){
      let rgx = new RegExp(r);
      if(rgx.test(path)){
        return true;
      }
    }
    if(Data.access == null) return false;
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
