import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: any;
  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      (res: any) => {
        this.clients = res.clients;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
