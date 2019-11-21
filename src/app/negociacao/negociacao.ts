import {Cliente} from '../cliente/cliente';
import { Funcionario } from '../funcionario/funcionario';
import { Imovel } from '../imovel/imovel';

export class Negociacao {
  id: number;

  data: Date;

  datainicio: Date;
 
  datafim: Date;

  vreceber: number;

  vpagar: number;

  status: number;

  tiponegocio: boolean;

  qtparcelas: number;

  cliente: Cliente;
  
  imovel: Imovel;

  funcionario: Funcionario;
  
}
