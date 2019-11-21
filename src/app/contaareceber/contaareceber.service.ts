import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { ContaaReceber } from './contaareceber';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ContaaReceberService extends CrudService<ContaaReceber, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/contaareceber', http);
  }
}
