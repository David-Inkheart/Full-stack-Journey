import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

// implements Mappable is optional, it helps us to catch errors in the actual code where we are using the interface
export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string = 'red';

  constructor() {
    this.name = faker.person.firstName();
    this.location = {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    };
  }

  makerContent(): string {
    return `User Name: ${this.name}`;
  }
}
