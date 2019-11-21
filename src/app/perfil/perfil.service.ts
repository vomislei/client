import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Perfil } from './perfil';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PerfilService extends CrudService<Perfil, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/perfil', http);
  }
}
