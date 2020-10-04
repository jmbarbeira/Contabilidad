import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { AddInvoiceComponent } from './invoices/add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './invoices/edit-invoice/edit-invoice.component';
import { InvoicesComponent } from './invoices/invoices.component';



const routes: Routes = [
  {path:'list-clients',component:ClientsComponent},
  {path:'list-invoices',component:InvoicesComponent},
  {path:'list-invoices-deleted',component:InvoicesComponent},
  {path:'add-invoice',component:AddInvoiceComponent},
  {path:'edit-invoice/:id',component:EditInvoiceComponent} ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
