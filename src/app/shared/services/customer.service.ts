import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service, HeaderType } from './Service';
import { User } from '../models';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService extends Service {
    public context = 'customers';
    constructor(public http: Http) {
        super(http);
    }

    search(kind:string, word:string){
      var query = '?';
      if(kind && kind != null) query += `kind=${kind}`;
      if(word && word != null) query += `word=${word}`;
      return this.http.get(`${this.requestUrl}${query == '?' ? '' : query}`,
                           { headers: this.headers(HeaderType.Authorization) })
               .map(res=>res.json());
    }

}
