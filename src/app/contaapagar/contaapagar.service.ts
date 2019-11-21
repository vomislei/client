import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { ContaaPagar } from './contaapagar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ContaaPagarService extends CrudService<ContaaPagar, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/contaapagar', http);
  }
}
