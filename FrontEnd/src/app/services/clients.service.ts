import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient){}
  getClients(){
    return this.http.get(`http://localhost:${environment.apiport}/client`)
      .pipe(map((res:any)=>{
          return res;
      }))
  }
}
