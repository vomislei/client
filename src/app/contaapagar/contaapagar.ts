import {Negociacao} from '../negociacao/negociacao';

export class ContaaPagar{
  id: number;

  datavenc: Date;

  dataquitacao: Date;

  valorpag: number;

  status: number;

  negociacao: Negociacao;
}
