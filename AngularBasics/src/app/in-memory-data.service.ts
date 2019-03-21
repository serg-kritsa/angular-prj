import { Injectable } from '@angular/core';

@Injectable()
export class InMemoryDataService {
  createDb() {
    const products = [
      { id: 1, name: 'phone1', price: 800 },
      { id: 2, name: 'phone2', price: 900 },
      { id: 3, name: 'phone3', price: 1000 }
    ];
    return { products };
  }
  constructor() { }
}
