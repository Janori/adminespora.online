import { Role } from './Role';

export class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public username: string;
    public img_path: string = null;
    public first_surname: string;
    public last_surname: string;
    public role_id: number;
    public created_at: string;
    public updated_at: string;
    public role: Role;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || '';
        this.email = obj && obj.email || '';
        this.password = obj && obj.password || '';
        this.username = obj && obj.username || '';
        this.first_surname = obj && obj.first_surname || '';
        this.last_surname = obj && obj.last_surname || '';
        this.role_id = obj && obj.role_id || null;
        this.created_at = obj && obj.created_at || null;
        this.updated_at = obj && obj.updated_at || null;


        this.role = obj && 'role' in obj ? new Role(obj.role) : null;
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
