import { Land } from './Land';
import { Housing } from './Housing';
import { Office } from './Office';
import { Warehouse } from './Warehouse';
import { Rent } from './Rent';
import { Customer } from './Customer';
import { User } from './User';
import { Provider } from './Provider';

export class Building {
    public id: number;
    public land_id: number;
    public warehouse_id: number;
    public office_id: number;
    public house_id: number;
    public owner_id: number;
    public price: number;
    public maintenance_cost: number;
    public maintenance_period: number = 0;
    public com_percent: number;
    public minimum_rent_period: number;
    public deposit_number: number;
    public extra_data: string;
    public is_rented: boolean;
    public facturable: boolean;
    public rents:Rent[];
    public tickets:Ticket[];

    public rent:Rent;

    public images: any = [];


    public kind: string = '';

    // Nested models

    public land: Land;
    public housing: Housing;
    public office: Office;
    public warehouse: Warehouse;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.land_id = obj && obj.land_id || null;
        this.warehouse = obj && obj.warehouse || null;
        this.office_id = obj && obj.office_id || null;
        this.house_id = obj && obj.house_id || null;
        this.owner_id = obj && obj.owner_id || null;
        this.price = obj && obj.price || null;
        this.maintenance_cost = obj && obj.maintenance_cost || null;
        this.maintenance_period = obj && obj.maintenance_period || 0;
        this.com_percent = obj && obj.com_percent || null;
        this.minimum_rent_period = obj && obj.minimum_rent_period || null;
        this.deposit_number = obj && obj.deposit_number || null;
        this.extra_data = obj && obj.extra_data || '';
        this.is_rented = obj && obj.is_rented || false;
        this.facturable = obj && obj.facturable || false;

        this.kind = obj && obj.kind || 'x';

        this.land = obj && 'land' in obj ? new Land(obj.land) : new Land();
        this.housing = obj && 'housing' in obj ? new Housing(obj.housing) : new Housing();
        this.office = obj && 'office' in obj ? new Office(obj.office) : new Office();
        this.warehouse = obj && 'warehouse' in obj ? new Warehouse(obj.warehouse) : new Warehouse();
        this.rents = obj && 'rents' in obj ? (<Array<any>>obj.rents).map(x=>{ return new Rent(x) }) : new Array<Rent>();
        this.tickets = obj && 'tickets' in obj ? (<Array<any>>obj.tickets).map(x=>{ return new Ticket(x) }).filter(x=>{
          return 'xfw'.indexOf(x.status) == -1;
        }) : new Array<Ticket>();

        this.rent = this.rents.find(x => {return x.status == 'r'});
        let ordered = this.rents.sort((x,y)=> x.id - y.id);
        if(ordered && ordered.length > 0) this.rent = ordered[0];
        if(this.rent == undefined) this.rent = new Rent();



        if(obj && 'images' in obj && Array.isArray(obj.images)) {
            for(let image of obj.images)
                this.images.push(image);
        }
    }


}

class Ticket {
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
    public cadastral_key: string;
    public facturable:boolean;

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
        this.cadastral_key = obj && obj.cadastral_key || null;
        this.facturable = obj && obj.facturable || false;

        this.created_at = obj && obj.created_at || null;
        this.updated_at = obj && obj.updated_at || null;

    }
}
