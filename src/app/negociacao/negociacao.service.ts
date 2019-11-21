import {Injectable} from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Negociacao} from './negociacao';

@Injectable()
export class NegociacaoService extends CrudService<Negociacao, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/negociacao', http);
  }
}
