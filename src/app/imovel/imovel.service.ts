import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Imovel } from './imovel';
import { Cliente } from '../cliente/cliente';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImovelService extends CrudService<Imovel, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/imovel', http);
  }

  findByCliente(cliente: Cliente): Observable<Imovel[]> {
    const url = `${this.getUrl()}/findByCliente?id=${cliente.id}`;
    return this.http.get<Imovel[]>(url);
  }
}
