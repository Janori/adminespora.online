export class Land {
    public id: number;
    public location: string;
    public surface: number;
    public predial_cost: number;
    public predial_date: Date;

    constructor(obj ?: any) {
        this.id = obj && obj.id || null;
        this.location = obj && obj.location || null;
        this.surface = obj && obj.surface || null;
        this.predial_cost = obj && obj.predial_cost || null;
        this.predial_date = obj && obj.predial_date || null;
    }
}
