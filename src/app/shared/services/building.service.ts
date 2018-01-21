import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Service } from './Service';

@Injectable()
export class BuildingService extends Service {
    public context = 'buildings';
    constructor(public http: Http) {
        super(http);
    }

}
