import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoices:any;
  constructor(private invoicesService:InvoicesService) { }

  ngOnInit(): void {
  this.invoicesService.getInvoices()
                      .subscribe(
                        (res:any)=>{this.invoices=res.invoices},
                        (err:any)=>{console.log(err)}
                      )
  }


}
