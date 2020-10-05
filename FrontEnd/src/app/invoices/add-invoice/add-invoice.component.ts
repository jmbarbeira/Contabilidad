import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Invoice } from 'src/app/models/invoice.model';
import { Location } from 'src//app/models/location.model';
import { Router } from '@angular/router';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss'],
})
export class AddInvoiceComponent implements OnInit {
  @ViewChild('name', { static: false }) nameRef: ElementRef;
  invoiceForm: FormGroup;
  validation = false;
  items: FormArray;
  constructor(
    private invoiceService: InvoicesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cif: new FormControl(''),
      country: new FormControl(''),
      province: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      postal: new FormControl(''),
      items: this.formBuilder.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      description: new FormControl(''),
      units: new FormControl(''),
      unitPrice: new FormControl(''),
      tax: new FormControl(''),
      quantity: new FormControl(''),
      total: new FormControl(''),
    });
  }

  addItem() {
    this.items = this.invoiceForm.get('items') as FormArray;

    this.items.push(this.createItem());
  }

  removeItem() {
    this.items = this.invoiceForm.get('items') as FormArray;

    this.items.removeAt(this.items.length - 1);
  }

  sendInvoice() {
    let date = new Date();

    let month = date.getMonth();
    let year = date.getFullYear();

    for (let i = 0; i < this.invoiceForm.get('items')['value'].length; i++) {
      let quantity = parseFloat(
        this.invoiceForm.get('items')['value'][i].quantity
      );
      let unitprice = parseFloat(
        this.invoiceForm.get('items')['value'][i].unitPrice
      );

      this.invoiceForm.get('items')['value'][i].total = quantity * unitprice;
    }

    let location = new Location(
      this.invoiceForm.get('country').value,
      this.invoiceForm.get('province').value,
      this.invoiceForm.get('city').value,
      this.invoiceForm.get('address').value,
      this.invoiceForm.get('postal').value
    );

    let client = new Client(
      this.invoiceForm.get('name').value,
      this.invoiceForm.get('cif').value,
      location
    );

    let invoice: Invoice = new Invoice(
      this.invoiceForm.get('name').value.substring(0, 3).toUpperCase() +
        '_' +
        year +
        '_' +
        month,
      client,
      Date(),
      Date(),
      this.invoiceForm.get('items')['value']
    );

    this.invoiceService.sendInvoices(invoice).subscribe(
      (res: any) => {
        // this.mensajesService.setMensaje(res.mensaje, 'El producto ha sido creado correctamente');

        this.router.navigate(['/list-invoices']);
      },
      (err: any) => {
        if (err.error.error !== undefined) {
          //   this.mensajesService.setMensaje('Ya existe un producto con ese sku', 'error');
        } else {
          //     this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
        }
      }
    );
  }
}
