import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  @Input() id:string;
  invoices:any;
  content:any;
  closeResult:string;
  constructor(private invoicesService:InvoicesService,
              private modal:NgbModal,
              private router:Router) {
              }

  ngOnInit(): void {
  this.invoicesService.getInvoices()
                      .subscribe(
                        (res:any)=>{this.invoices=res.invoices},
                        (err:any)=>{console.log(err)}
                      )
  }

  deleteInvoice(){
  this.invoicesService.deleteOneInvoice(this.selected)
  .subscribe((res:any)=>{
    this.modal.dismissAll();
    this.router.navigate(['/list-invoices-deleted']);
     // this.mensajesService.setMensaje(res.mensaje, 'El producto ha sido creado correctamente');
    },(err:any)=>{
      if(err.error.error !== undefined) {
    //   this.mensajesService.setMensaje('Ya existe un producto con ese sku', 'error');
      } else {
   //     this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
      }
    })
}

selected;
  showModal(content,id){
    this.modal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.router.navigate(['/list-invoices-deleted']);
  });
this.selected=id.invoiceNumber;
  }

}
