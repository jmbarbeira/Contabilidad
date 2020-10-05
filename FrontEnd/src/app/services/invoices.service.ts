import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice.model';
@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}
  getInvoices() {
    return this.http
      .get(`http://localhost:${environment.apiport}/invoice`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getOneInvoice(id) {
    return this.http
      .get(`http://localhost:${environment.apiport}/invoice/${id}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  sendInvoices(invoice: Invoice) {
    return this.http
      .post(`http://localhost:${environment.apiport}/invoice`, invoice)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateInvoices(invoice: Invoice, id: string) {
    return this.http
      .put(`http://localhost:${environment.apiport}/invoice/${id}`, invoice)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteOneInvoice(id: string) {
    return this.http
      .delete(`http://localhost:${environment.apiport}/invoice/${id}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
