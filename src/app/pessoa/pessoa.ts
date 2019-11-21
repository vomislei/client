import { Bairro } from "../bairro/bairro";

export abstract class Pessoa {
  
    id: number;
  
    nome: string;
  
    apelido: string;
  
    cpf_cnpj: number;
  
    telefone: string;
  
    endereco: string;
  
    email: string;

    bairro: Bairro;

  }
  
