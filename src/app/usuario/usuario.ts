import { Perfil } from "../perfil/perfil";
import { Funcionario } from "../funcionario/funcionario";
export class Usuario {

  id: number;

  username: string;

  password: string;

  nome: string;

  ativo: boolean;

  perfil: Perfil;

  funcionario: Funcionario;

  authorities: any[];
}
