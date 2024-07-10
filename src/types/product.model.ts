export interface IProduct {
  id: string;
  name: string;
  category: string;
  estimatedtime: number;
  price: number;
}

export class Product implements IProduct {
  id: string;
  name: string;
  category: string;
  estimatedtime: number;
  price: number;

  constructor(id: string, name: string, category: string, estimatedtime: number, price: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.estimatedtime = estimatedtime;
    this.price = price;
  }

  static createFromInterface(data: IProduct) {
    return new Product(data.id, data.name, data.category, data.estimatedtime, data.price);
  }

  clone(): Product {
    return new Product(this.id, this.name, this.category, this.estimatedtime, this.price);
  }

  static empty(): Product {
    return new Product('', '', '', 0, 0);
  }
}
