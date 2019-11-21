import {Injectable} from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Funcionario} from './funcionario';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class FuncionarioService extends CrudService<Funcionario, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/funcionario', http);
  }
}
