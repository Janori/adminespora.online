export class User {
    public id: number;
    public name: string;
    public first_surname: string;
    public last_surname: string;
    public role: string;
    public username: string;
    public password: string;
    public created_at: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || '';
        this.first_surname = obj && obj.first_surname || '';
        this.last_surname = obj && obj.last_surname || '';
        this.role = obj && obj.role || null;
        this.username = obj && obj.username || null;
        this.password = obj && obj.password || null;
        this.created_at = obj && obj.created_at || null;
    }

    get full_name() {
        return `${this.name} ${this.first_surname} ${this.last_surname}`;
    }
}
