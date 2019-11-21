import {Injectable} from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Pessoa} from './pessoa';


@Injectable()
export class PessoaService extends CrudService<Pessoa, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/pessoa', http);
  }
}

