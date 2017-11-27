import { User } from '../models/User';

export class Data{
  static user:User;
  static access:any = {};
  static kind : string;

  public static canAccess(path:string) : boolean{
    for(let a of Data.access){
      let rgx = new RegExp(a.path_regex);
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
