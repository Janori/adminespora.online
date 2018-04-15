import { Customer } from './Customer';
import { Provider } from './Provider';
import { User } from './User';
import { Building } from './Building';

export class Ticket {
    public id: number;
    public requester_id: number;
    public requester: any;
    public agent_id: number;
    public agent: any
    public building_id: number;
    public building: any;
    public provider_id: number;
    public provider: any;
    public data: string;
    public provider_cost: number;
    public price: number;
    public estimated_date: string;
    public finalizated_date: string;
    public extra: string;
    public status: string;
    public request_hash: string;

    public created_at: Date;
    public updated_at: Date;

    public getStatus() : string{
      switch(this.status){
        case 'a': return 'Abierto';
        case 'c': return 'Cotizado';
        case 'x': return 'Rechazado';
        case 'v': return 'Aceptado';
        case 'w': return 'Vencido';
        case 'f': return 'Finalizado';
        case 'i': return 'Iniciado';
      }
    }

    getActiveStep() : number{
      var active = 1;
      if(this.requester != null && this.data != null && this.data.length > 0){
        active++;
      }
      if(this.provider != null && this.provider_cost != null && this.estimated_date != null){
        active++;
      }
      if('vx'.indexOf(this.status) != -1){
        active++;
      }
      return active;
    }

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.requester_id = obj && obj.requester_id || null;
        this.requester = obj && new Customer(obj.requester) || new Customer();
        this.agent_id = obj && obj.agent_id || null;
        this.agent = obj && obj.agent || new User();
        this.building_id = obj && obj.building_id || null;
        this.building = obj && obj.building || new Building();
        this.provider_id = obj && obj.provider_id || null;
        this.provider = obj && new Provider(obj.provider) || new Provider();
        this.data = obj && obj.data || null;
        this.provider_cost = obj && obj.provider_cost || null;
        this.price = obj && obj.price || null;
        this.estimated_date = obj && obj.estimated_date || null;
        this.finalizated_date = obj && obj.finalizated_date || null;
        this.extra = obj && obj.extra || null;
        this.status = obj && obj.status || null;
        this.request_hash = obj && obj.request_hash || null;

        this.created_at = obj && obj.created_at || null;
        this.updated_at = obj && obj.updated_at || null;

    }
}
