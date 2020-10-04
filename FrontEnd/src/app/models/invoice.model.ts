import { Client } from './client.model';
import { Item } from './item.model';
import {Location} from './location.model'

export class Invoice {
  invoiceNumber:string;
  client:Client;
  billingDate: Date;
  paymentDate: Date;
  items:Item[];

  constructor(invoice,name,cif,country,province,city,address,postal,billing,payment,items){
    this.invoiceNumber=invoice;
    this.client= new Client(name,cif,country,province,city,address,postal)
    this.billingDate=billing;
    this.paymentDate=payment;
    this.items= items}

}
