import { getAge } from '@/utils/format/DateFormat';

export interface ICustomer {
  id: string;
  name: string;
  birthday: Date;
  lastAppointment: Date | null;
  diseases: string[];
  age: number;
}

export class Customer implements ICustomer {
  id: string;
  name: string;
  birthday: Date;
  lastAppointment: Date | null;
  diseases: string[];

  constructor(id: string, name: string, birthday: Date, lastAppointment: Date | null, diseases: string[]) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
    this.lastAppointment = lastAppointment;
    this.diseases = diseases;
  }

  static createFromInterface(data: ICustomer) {
    return new Customer(data.id, data.name, data.birthday, data.lastAppointment, data.diseases);
  }

  setBirthday(newBirthday: Date) {
    this.birthday = newBirthday;
  }

  get age(): number {
    return getAge(this.birthday);
  }

  clone(): Customer {
    return new Customer(
      this.id,
      this.name,
      new Date(this.birthday),
      this.lastAppointment ? new Date(this.lastAppointment) : null,
      [...this.diseases],
    );
  }

  static empty(): Customer {
    return new Customer('', '', new Date(), null, []);
  }
}
