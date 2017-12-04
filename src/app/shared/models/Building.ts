import { Owner } from './Owner';
import { Rent } from './Rent';

export class Building {
    public id: number;
    public is_new: number;
    public address: string;
    public rent_price: number;
    public comision: number;
    // XDXD
    public plazo_minimo: number;
    public no_depositos: number;
    public costo_mto: number;
    public habitaciones: number;
    public banos: number;
    public estacionamientos: number;
    public patios: number;
    public terreno: number;
    public construccion: number;
    public ano_contruccion: number;
    public predial: number;
    public rent: Rent = null;
    public owner_id: number;
    public owner: Owner;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.is_new = obj && obj.is_new || null;
        this.address = obj && obj.address || '';
        this.rent_price = obj && obj.rent_price || null;
        this.comision = obj && obj.comision || null;
        // XDXD
        this.plazo_minimo = obj && obj.plazo_minimo || null;
        this.no_depositos = obj && obj.no_depositos || null;
        this.costo_mto = obj && obj.costo_mto || null;
        this.habitaciones = obj && obj.habitaciones || null;
        this.banos = obj && obj.banos || null;
        this.estacionamientos = obj && obj.estacionamientos || null;
        this.patios = obj && obj.patios || null;
        this.terreno = obj && obj.terreno || null;
        this.construccion = obj && obj.construccion || null;
        this.ano_contruccion = obj && obj.ano_contruccion || null;
        this.predial = obj && obj.predial || null;
        this.owner_id = obj && obj.owner_id || null;

        this.owner = obj && 'owner' in obj ? new Owner(obj.owner) : null;
    }

    get rent_status(): number {
        if(this.rent == null)
            return 1;
        else if(this.rent.id == null)
            return 2;
        else
            return 3;
    }
}
