import { Person } from "./person";

export class Retiree extends Person {

    constructor(public firstName: string, public lastName: string) {
        super(); // base in c#
    }

    getInfo() {
        return `Retiree ${this.firstName} ${this.lastName}`;
    }
}