import { Location } from './location.model';

export class Client {
  name: string;
  cif: string;
  location: Location;

  constructor(name, cif, location) {
    this.name = name;
    this.cif = cif;
    this.location = location;
  }
}
