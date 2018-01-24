import { Land } from './Land';
import { Housing } from './Housing';
import { Office } from './Office';
import { Warehouse } from './Warehouse';

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

    public images: any = [];

    public rent: any = {
        document_url: ''
    };

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

        this.land = obj && 'land' in obj ? new Land(obj.land) : new Land();
        this.housing = obj && 'housing' in obj ? new Housing(obj.housing) : new Housing();
        this.office = obj && 'office' in obj ? new Office(obj.office) : new Office();
        this.warehouse = obj && 'warehouse' in obj ? new Warehouse(obj.warehouse) : new Warehouse();

        if(obj && 'images' in obj && Array.isArray(obj.images)) {
            for(let image of obj.images)
                this.images.push(image);
        }
    }
}
