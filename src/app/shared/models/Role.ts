export class Role {
    public id: number;
    public code: string;
    public description: string;

    constructor(obj: any) {
        this.id             = obj.id;
        this.code           = obj.code;
        this.description   = obj.description;
    }

    get name(): string {
        switch(this.code) {
            case 'admin': return 'Administrador';
            case 'agent': return 'Agente';
            default: 'Usuario común';
        }
    }
}
