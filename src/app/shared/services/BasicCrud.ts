import { Observable } from 'rxjs/observable';
import { Response } from '@angular/http';

export interface BasicCrud {
    context: string;
    getAll(): Observable<any>;
    getOne(id: number): Observable<any>;
    create(data: any): Observable<any>;
    edit(data: any): Observable<any>;
    delete(data: any): Observable<any>;
}
