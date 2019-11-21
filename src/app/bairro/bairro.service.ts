import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Bairro } from './bairro';
import { Cidade } from '../cidade/cidade';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class BairroService extends CrudService<Bairro, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/bairro', http);
  }

  findByCidade(cidade: Cidade): Observable<Bairro[]> {
    const url = `${this.getUrl()}/findByCidade?id=${cidade.id}`;
    return this.http.get<Bairro[]>(url);
  }
}
