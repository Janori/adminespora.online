export class Office {
    public id: number;
    public baths: number
    public parkings: number
    public yards: number
    // public kind: number

    constructor(obj ?: any) {
        this.id = obj && obj.id || null;;
        this.baths = obj && obj.baths || null;
        this.parkings = obj && obj.parkings || null;
        this.yards = obj && obj.yards || null;
        // this.kind = obj && obj.kind || null;
    }
}
