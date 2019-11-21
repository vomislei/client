import {Negociacao} from '../negociacao/negociacao';
export class ContaaReceber{
  id: number;

  datavenc: Date;

  dataquitacao: Date;

  valorrec: number;

  status: number;

  negociacao: Negociacao;
}
