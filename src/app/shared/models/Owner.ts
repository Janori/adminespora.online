export class Owner {
    public id: number;
    public name: string;
    public first_surname: string;
    public last_surname: string;
    public address: string;
    public phone: string;
    public cellphone: string;
    public created_at: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || '';
        this.first_surname = obj && obj.first_surname || '';
        this.last_surname = obj && obj.last_surname || '';
        this.address = obj && obj.address || '';
        this.phone = obj && obj.phone || '';
        this.cellphone = obj && obj.cellphone || '';
        this.created_at = obj && obj.created_at || null;
    }

    get full_name() {
        return `${this.name} ${this.first_surname} ${this.last_surname}`;
    }
}
