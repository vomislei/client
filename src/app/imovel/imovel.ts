import {Cliente} from '../cliente/cliente';
import {Bairro} from '../bairro/bairro';

export class Imovel {
  id: number;

  quartos: number;

  vgaragem: number;

  ativo: boolean;

  latitude: number;

  longitude: number;

  venda: boolean;
  
  locacao: boolean;

  troca: boolean;
  
  vvenda: number;

  vlocacao: number;

  mterreno: number;

  mimovel: number;

  rua: string;

  cep: number;

  cliente: Cliente;
  
  bairro: Bairro;
  
}
