import { Renter, Owner } from './';

export class Rent {
    public id: number;
    public renter_id: number;
    public renter: Renter;
    public owner_id: number;
    public owner: Owner;
    public precio_minimo: number;
    public plazo_minimo: number;
    public precio_renta: number;
    public fecha_inicio: string;
    public document_url: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.renter_id = obj && obj.renter_id || null;
        this.owner_id = obj && obj.owner_id || null;
        this.precio_minimo = obj && obj.precio_minimo || 0;
        this.plazo_minimo = obj && obj.plazo_minimo || 0;
        this.precio_renta = obj && obj.precio_renta || 0;
        this.fecha_inicio = obj && obj.fecha_inicio || '';
        this.document_url = obj && obj.document_url || '';

        this.renter = obj && 'renter' in obj ? new Renter(obj.renter): null;
        this.owner = obj && 'owner' in obj ? new Owner(obj.owner): null;
    }
}
