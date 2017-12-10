import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './Service';
import { User } from '../models';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService extends Service {
    public context = 'users';

    constructor(public http: Http) {
        super(http);
    }
}
