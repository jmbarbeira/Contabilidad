import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InvoicesService {


  constructor(private http: HttpClient){}
  getInvoices(){
    return this.http.get(`http://localhost:${environment.apiport}/invoice`)
      .pipe(map((res:any)=>{
          return res;
      }))
  }
}
