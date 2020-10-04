import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { NavComponent } from './commons/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddInvoiceComponent } from './invoices/add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './invoices/edit-invoice/edit-invoice.component'
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    InvoicesComponent,
    NavComponent,
    AddInvoiceComponent,
    EditInvoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
