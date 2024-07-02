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

  setBirthday(newBirthday: Date) {
    this.birthday = newBirthday;
  }

  get age(): number {
    const today = new Date();
    let age = today.getFullYear() - this.birthday.getFullYear();
    const monthDifference = today.getMonth() - this.birthday.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.birthday.getDate())) {
      age--;
    }
    return age;
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
