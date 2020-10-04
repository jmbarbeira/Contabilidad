import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoicesService } from 'src/app/services/invoices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup,Validators,FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class EditInvoiceComponent implements OnInit {
 id:String;
 private sub: any;
 closeResult:string;
 selected;
 invoiceForm: FormGroup;
 items: FormArray;

  constructor(private route: ActivatedRoute,private invoiceService:InvoicesService,private modal:NgbModal,private router:Router,private formBuilder:FormBuilder) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getInvoice();
      });
  }
invoice:Invoice



  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      cif: new FormControl(''),
      country: new FormControl(''),
      province: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      postal: new FormControl(''),
      items: this.formBuilder.array([ this.createItem() ])

    })

   }

   showModal(content,id){

    this.modal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.router.navigate(['/list-invoices-deleted']);
  });
this.selected=id.invoiceNumber;
  }

   deleteInvoice(){
      this.invoiceService.deleteOneInvoice(this.selected)
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

  getInvoice(){
    this.invoiceService.getOneInvoice(this.id)
                  .subscribe((res:any)=>{
                     // this.mensajesService.setMensaje(res.mensaje, 'El producto ha sido creado correctamente');
                     this.invoice=res['invoice'];
                     this.invoiceForm.setValue({
                       name:this.invoice.client.name,
                       cif:this.invoice.client.cif,
                       country:this.invoice.client.location.country,
                       province:this.invoice.client.location.province,
                       city: this.invoice.client.location.city,
                       postal:this.invoice.client.location.postal,
                       address:this.invoice.client.location.address,
                       items:[{description:'',units:"",unitPrice:"",tax:"",total:"",quantity:""}]
                     })

                     for(let i=0;i<this.invoice.items.length;i++){
                      if (i===0){
                        this.removeItem()
                        this.addItem(this.invoice.items[i]);
                      }
                      else{
                          this.addItem(this.invoice.items[i]);}
                    }
console.log(this.invoiceForm.controls)
                    // console.log(this.invoice)
                    },(err:any)=>{
                      if(err.error.error !== undefined) {
                    //   this.mensajesService.setMensaje('Ya existe un producto con ese sku', 'error');
                      } else {
                   //     this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                      }
                    })
  }


  addItem(a?){

    this.items = this.invoiceForm.get('items') as FormArray;

    if(a!==undefined){
      this.items.push(this.createItem(a));
    }
    else{this.items.push(this.createItem());}

  }

  removeItem(){


    this.items = this.invoiceForm.get('items') as FormArray;

    this.items.removeAt(this.items.length-1)
  }

  createItem(a?): FormGroup {

    if(a!==undefined){

      return this.formBuilder.group({
        description:new FormControl(a.description),
        units:new FormControl(a.units),
        unitPrice:new FormControl(a.unitprice),
        tax: new FormControl(a.tax),
        quantity: new FormControl(a.quantity),
        total:new FormControl(a.total)
      });

    }
    return this.formBuilder.group({
      description:new FormControl(''),
      units:new FormControl(''),
      unitPrice:new FormControl(''),
      tax: new FormControl(''),
      quantity: new FormControl(''),
      total:new FormControl('')
    });




  }


  sendInvoice() {
    let date = new Date()

    let month = date.getMonth()
    let year = date.getFullYear()

for (let i=0;i<this.invoiceForm.get('items')['value'].length;i++)
 {
let quantity=parseFloat(this.invoiceForm.get('items')['value'][i].quantity)
let unitprice=parseFloat(this.invoiceForm.get('items')['value'][i].unitPrice)

  this.invoiceForm.get('items')['value'][i].total=quantity*unitprice;
  };


    let invoice: Invoice = new Invoice(
      this.invoiceForm.get('name').value.substring(0,3).toUpperCase()+"_"+year+"_"+month,
      this.invoiceForm.get('name').value,
      this.invoiceForm.get('cif').value,
        this.invoiceForm.get('country').value,
        this.invoiceForm.get('city').value,
        this.invoiceForm.get('province').value,
        this.invoiceForm.get('address').value,
      this.invoiceForm.get('postal').value,
      Date(), Date(),this.invoiceForm.get('items')['value']

      )


  this.invoiceService.sendInvoices(invoice)
                  .subscribe((res:any)=>{
                     // this.mensajesService.setMensaje(res.mensaje, 'El producto ha sido creado correctamente');

                      this.router.navigate(['/list-invoices']);
                    },(err:any)=>{
                      if(err.error.error !== undefined) {
                    //   this.mensajesService.setMensaje('Ya existe un producto con ese sku', 'error');
                      } else {
                   //     this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                      }
                    })
  }
}


