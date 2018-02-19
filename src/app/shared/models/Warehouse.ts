export class Warehouse {
    public id: number;
    public is_new: number;
    public build_surface: number;
    public building_year: number;

    constructor(obj ?: any) {
        this.id = obj && obj.id || null;
        this.is_new = obj && obj.is_new || false;
        this.build_surface = obj && obj.build_surface || null;
        this.building_year = obj && obj.building_year || null;
    }
}
