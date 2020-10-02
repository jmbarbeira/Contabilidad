import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { InitComponent } from './init/init.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  {path:'',component:InitComponent},
  {path:'list-clients',component:ClientsComponent},
  {path:'list-invoices',component:InvoicesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
