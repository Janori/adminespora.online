import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Service, HeaderType } from './Service';
import 'rxjs/add/operator/map';

@Injectable()
export class TicketsService extends Service {
  public context = 'tickets';

  constructor(public http: Http) {
      super(http);
  }

  public startTicket(data:string, requesterId:number, buildingId:number){
    let d = {
    	data: data,
    	requester_id: requesterId,
    	building_id: buildingId
    }

    return this.http.post(`${this.requestUrl}/open`, d,
                     { headers: this.headers(HeaderType.Authorization, HeaderType.Json) })
         .map(res=>res.json());
  }

  public quoteTicket(ticketId: number, providerId:string, cost:number, price:number, estimated_weeks:number){
    let d = {
    	provider_id: providerId,
    	provider_cost: cost,
    	price: price,
    	estimated_date: estimated_weeks
    }

    return this.http.post(`${this.requestUrl}/${ticketId}/quote`, d,
                     { headers: this.headers(HeaderType.Authorization, HeaderType.Json) })
         .map(res=>res.json());
  }

  public closeTicket(ticketId, extra:string, status:any){
    let d = {
      status: status,
      extra: extra
    }
    return this.http.post(`${this.requestUrl}/${ticketId}/close`, d,
                     { headers: this.headers(HeaderType.Authorization, HeaderType.Json) })
         .map(res=>res.json());
  }



}
