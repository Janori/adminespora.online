import { Renter } from './Renter';
import { Owner } from './Owner'

export class Rent {
    public id: number;
    public renter_id: number;
    public renter: Renter;
    public owner_id: number;
    public owner: Owner;
    public user_id:number;
    public building_id: number;
    public rent_period: number;
    public price: number;
    public status: string;
    public start_date: Date;
    public contract_path: string;
    public extra_data:number;

    public created_at:Date;
    public updated_at:Date;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.renter_id = obj && obj.renter_id || null;
        this.owner_id = obj && obj.owner_id || null;

        this.user_id = obj && obj.user_id || '';
        this.building_id = obj && obj.building_id || '';
        this.rent_period = obj && obj.rent_period || '';
        this.price = obj && obj.price || '';
        this.status = obj && obj.status || '';
        this.start_date = obj && new Date((''+obj.start_date).replace(' ', 'T')) || null;
        this.contract_path = obj && obj.contract_path || '';
        this.extra_data = obj && obj.extra_data || '';

        this.created_at = obj && obj.created_at || new Date();
        this.updated_at = obj && obj.updated_at || new Date();



        this.renter = obj && 'renter' in obj ? new Renter(obj.renter): null;
        this.owner = obj && 'owner' in obj ? new Owner(obj.owner): null;
    }
}
