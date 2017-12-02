export class Ticket {
    public id: number;
    public applicant_id: number;
    public applicant: any;
    public user_id: number;
    public user: any
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

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.applicant_id = obj && obj.applicant_id || null;
        this.applicant = obj && obj.applicant || null;
        this.user_id = obj && obj.user_id || null;
        this.user = obj && obj.user || null
        this.building_id = obj && obj.building_id || null;
        this.building = obj && obj.building || null;
        this.provider_id = obj && obj.provider_id || null;
        this.provider = obj && obj.provider || null;
        this.data = obj && obj.data || '';
        this.provider_cost = obj && obj.provider_cost || 0;
        this.price = obj && obj.price || 0;
        this.estimated_date = obj && obj.estimated_date || '';
        this.finalizated_date = obj && obj.finalizated_date || '';
        this.extra = obj && obj.extra || '';
        this.status = obj && obj.status || '';

    }
}
