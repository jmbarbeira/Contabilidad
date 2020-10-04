import {Location} from './location.model'

export class Client {
  name:string;
  cif:string;
  location:Location;

  constructor(name,cif,country,province,city,address,postal){
    this.name=name;
    this.cif=cif;
    this.location= new Location(country,province,city,address,postal);

  }

}
