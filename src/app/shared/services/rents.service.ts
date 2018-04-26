import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Service, HeaderType } from './Service';
import 'rxjs/add/operator/map';

@Injectable()
export class RentsService extends Service {
    public context = 'rents';

    constructor(public http: Http) {
        super(http);
    }

    public downloadContract(id:number){
      return this.http.get(`${this.requestUrl}/${id}/contract`,
                    { headers: this.headers(HeaderType.Authorization),
                      responseType: ResponseContentType.ArrayBuffer });
    }

    public init(data:any){
      return this.http.post(`${this.requestUrl}/init`,
                      data,
                      { headers: this.headers(HeaderType.Authorization, HeaderType.Json) });
    }

    public finalize(id:number,pdf:File, isFacturable:boolean){
      let data = new FormData();
      data.append('pdf', pdf, pdf.name);
      data.append('isFacturable', ''+isFacturable);
      return this.http.post(`${this.requestUrl}/${id}/complete`,
                            data,
                            { headers: this.headers(HeaderType.Authorization) });
    }

}
