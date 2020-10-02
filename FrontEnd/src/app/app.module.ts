import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InitComponent } from './init/init.component';
import { NavComponent } from './commons/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    InvoicesComponent,
    InitComponent,
    NavComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
