import { Injectable } from '@angular/core';
import { Service, HeaderType } from './Service';
import { Http } from '@angular/http';

@Injectable()
export class DashboardService extends Service {
    public context = null;

    constructor(private http: Http) {
        super(http);
    }


    getRoles = () => {
        return this._http.get(this.mainUrl + 'cat/roles', { headers: this.headers(HeaderType.Json, HeaderType.Authorization)})
                         .map(res => res.json());
    }

}
