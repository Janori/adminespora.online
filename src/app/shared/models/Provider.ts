export class Provider {
    // public id: number;
    // public name: string;
    // public first_surname: string;
    // public last_surname: string;
    // public address: string;
    // public phone: string;
    // public cellphone: string;
    // public rfc: string;
    // public created_at: string;
    public id: number;
    public email: string;
    public name: string;
    public first_surname: string;
    public last_surname: string;
    public gender: string;
    public mariage_status: string;
    public kind: string;
    public created_at: string;
    public updated_at: string;
    public calle: string;
    public colonia: string;
    public cp: string;
    public municipio: string;
    public estado: string;
    public pais: string;

    constructor(obj?: any) {
        /*this.id = obj && obj.id || null;
        this.name = obj && obj.name || '';
        this.first_surname = obj && obj.first_surname || '';
        this.last_surname = obj && obj.last_surname || '';
        this.address = obj && obj.address || '';
        this.phone = obj && obj.phone || '';
        this.cellphone = obj && obj.cellphone || '';
        this.rfc = obj && obj.rfc || '';
        this.created_at = obj && obj.created_at || null;*/
        this.id = obj && obj.id || null;
        this.email = obj && obj.email || '';
        this.name = obj && obj.name || '';
        this.first_surname = obj && obj.first_surname || '';
        this.last_surname = obj && obj.last_surname || '';
        this.gender = obj && obj.gender || 'x';
        this.mariage_status = obj && obj.mariage_status || 'x';
        this.kind = obj && obj.kind || '';
        this.created_at = obj && obj.created_at || '';
        this.updated_at = obj && obj.updated_at || '';
        this.calle = obj && obj.calle || '';
        this.colonia = obj && obj.colonia || '';
        this.cp = obj && obj.cp || '';
        this.municipio = obj && obj.municipio || '';
        this.estado = obj && obj.estado || '';
        this.pais = obj && obj.pais || '';
    }

    get full_name() {
        return `${this.name} ${this.first_surname} ${this.last_surname}`.trim();
    }

    set full_name(value: string) {
        value = value.trim();
        let [ name, firstSurname, lastSurname ] = value.split(' ');

        if(name == undefined)
            name = '';

        if(firstSurname == undefined)
            firstSurname = '';

        if(lastSurname == undefined)
            lastSurname = '';

        [ this.name, this.first_surname, this.last_surname ] = [ name.trim(), firstSurname.trim(), lastSurname.trim() ];
    }
}
