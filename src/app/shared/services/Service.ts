import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Data } from '../common/shared.data';
import { BasicCrud } from './BasicCrud';

@Injectable()
export class Service implements BasicCrud {
    public context;
    protected mainUrl: string;

    constructor(public _http: Http) {
        this.mainUrl = 'http://adminespora.janori.com/';
    }

    getNewtoken(email: string, secret: string) {
        let url = this.mainUrl + 'auth';
        var data:any;
        let headers = this.headers();

        if(email.indexOf("@") == -1)
            data = {
                "username":email,
                "password":secret
            };
        else
            data = {
                "email":email,
                "password": secret
            };

        return this._http.post(url, data, { headers })
                         .map(res => {
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

                return true;
            } else {
                return false;
            }
        }).catch(error => {
            if(error.name == "TimeoutError")
                return Observable.throw("Tiempo de espera agotado, intente de nuevo más tarde.");

            return Observable.throw(error);
        });
    }

    headers(...withHeaders: HeaderType[]) {
        let headers = new Headers();

        for(let h of withHeaders) {
            switch(h){
                case HeaderType.Json:
                    headers.append("Content-Type", "application/json");
                    break;
                case HeaderType.Authorization:
                    if(localStorage.getItem('auth_token') !== null)
                        headers.append("Authorization", 'Bearer ' + localStorage.getItem('auth_token'));
                    break;
            }
        }
        return headers;
    }

    getAll = () => {
        return this._http.get(this.requestUrl, { headers: this.headers(HeaderType.Authorization, HeaderType.Json)})
                         .map(res => res.json());
    }

    getOne = (id: number) => {
        return this._http.get(`${ this.requestUrl}/${ id }`, { headers: this.headers(HeaderType.Authorization, HeaderType.Json)})
                         .map(res => res.json());
    }

    create = (data: any) => {
        return this._http.post(this.requestUrl, data, { headers: this.headers(HeaderType.Authorization, HeaderType.Json)})
                         .map(res => res.json());
    }

    edit = (data: any) => {
        return this._http.put(`${ this.requestUrl }/${ data.id} `, data, { headers: this.headers(HeaderType.Authorization, HeaderType.Json)})
                         .map(res => res.json());
    }

    delete = (data: any) => {
        return this._http.delete(`${ this.requestUrl }/${ data.id }`, { headers: this.headers(HeaderType.Authorization, HeaderType.Json)})
                         .map(res => res.json());
    }

    get requestUrl() {
        return `${this.mainUrl}${this.context}`;
    }
}

export enum HeaderType {
    Json,
    Authorization
}
