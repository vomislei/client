import {Injectable} from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Cliente} from './cliente';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ClienteService extends CrudService<Cliente, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/cliente', http);
  }
}
