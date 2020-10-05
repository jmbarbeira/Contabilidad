import { Client } from './client.model';
import { Item } from './item.model';
import { Location } from './location.model';

export class Invoice {
  invoiceNumber: string;
  client: Client;
  billingDate: Date;
  paymentDate: Date;
  items: Item[];

  constructor(invoice, client, billing, payment, items) {
    this.invoiceNumber = invoice;
    (this.client = client), (this.billingDate = billing);
    this.paymentDate = payment;
    this.items = items;
  }
}
