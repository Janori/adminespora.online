export class Housing {
    public id: number;
    public rooms: number;
    // public kind: number;

    constructor(obj ?: any) {
        this.id = obj && obj.id || null;
        this.rooms = obj && obj.rooms || null;
        // this.kind = obj && obj.kind || null;
    }
}
