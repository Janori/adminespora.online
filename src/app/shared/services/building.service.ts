import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Service, HeaderType } from './Service';

@Injectable()
export class BuildingService extends Service {
    public context = 'buildings';
    constructor(public http: Http) {
        super(http);
    }

    uploadImage(id: number, data: any) {
        return this.http.post(`${ this.requestUrl}/${ id }/images`, data, { headers: this.headers(HeaderType.Authorization)})
                        .map(res => res.json());
    }

    destroyImage(id: number) {
        return this.http.delete(`${ this.requestUrl}/images/${ id }`, { headers: this.headers(HeaderType.Authorization)})
                        .map(res => res.json());
    }

}
