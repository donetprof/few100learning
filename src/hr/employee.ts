import { Person } from "./person";
import { Reportable, HasSalary } from ".";

export class Employee extends Person implements Reportable, HasSalary {

    job: string;
    private _salary: number = 80000;

    constructor(public firstName: string, public lastName: string) {
        super(); // base in c#
    }

    get salary(): number {
        return this._salary;
    }
    // set salary(newVal: number) { this._salary = newVal; }

    getReport(): string {
        return `Report for ${this.getInfo()}`
    }

    giveRaise(amount: number): void {
        this._salary += amount;
    }

    getInfo(): string {
        return `${this.job} ${this.firstName} ${this.lastName}`;
    }
}