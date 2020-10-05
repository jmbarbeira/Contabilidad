export class Item {
  description: string;
  quantity: Number;
  units: 'Hours';
  unitPrice: Number;
  tax: Number;
  total: Number;

  constructor(description, quantity, units, unitPrice, tax, total) {
    this.description = description;
    this.quantity = quantity;
    this.units = units;
    this.unitPrice = unitPrice;
    this.tax = tax;
    this.total = total;
  }
}
