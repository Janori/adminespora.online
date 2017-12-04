import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Data } from '../shared/common/shared.data';

@Injectable()
export class Service {

  public mainUrl: string;

  constructor(public http:Http) {
    this.mainUrl = 'http://adminespora.janori.com/';
  }

  getNewtoken(email:string, secret:string){
    let url = this.mainUrl + 'auth';
    var data:any;
    let headers = this.headers();
    if(email.indexOf("@") == -1){
      data = {
        "username":email,
        "password":secret
      }
    }else{
      data = {
        "email":email,
        "password": secret
      };
    }
    return this.http.post(url, data, { headers })
      .map( res =>{
        if(res.json().status){
          let minutes:number = res.json().data.ttl;
          let milliseconds = minutes * 1000 * 60;
          var d1 = new Date();
          d1.setTime(d1.getTime() + milliseconds);
          localStorage.setItem('auth_token', res.json().data.token);
          localStorage.setItem('expiration_token', d1.toString());
          let perms = res.json().data.perms;
          let user = res.json().data.user;
          localStorage.setItem('perms', perms != null ? JSON.stringify(perms) : null);
          localStorage.setItem('user', user != null ? JSON.stringify(user) : null);
          Data.loadFromStorage(true);
          //console.log(res.json().data);
          return true;
        }else{
          return false;
        }
      }).catch((error)=>{
        if(error.name == "TimeoutError"){
          return Observable.throw("Tiempo de espera agotado, intente de nuevo más tarde.");
        }
        return Observable.throw(error);
      });
    }

    headers(...withHeaders: HeaderType[]) {
        let headers = new Headers();

        for(let h of withHeaders){
            switch(h){
              case HeaderType.Json:
                headers.append("Content-Type", "application/json");
                break;
              case HeaderType.Authorization:
                if(localStorage.getItem('auth_token') !== null)
                  headers.append("Authorization", localStorage.getItem('auth_token'));
                break;
            }
        }
        return headers;
    }

}

export enum HeaderType{
  Json,
  Authorization
}
