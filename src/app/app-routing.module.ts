import {UsuarioComponent} from './usuario/usuario.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginService} from './login/login.service';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ClienteComponent} from './cliente/cliente.component';
import {PerfilComponent} from './perfil/perfil.component';
import {FuncionarioComponent} from './funcionario/funcionario.component';
import {BairroComponent} from './bairro/bairro.component';
import {CidadeComponent} from './cidade/cidade.component';
import {ImovelComponent} from './imovel/imovel.component';
import {NegociacaoComponent} from './negociacao/negociacao.component';
import {ContaaReceberComponent} from './contaareceber/contaareceber.component';
import {ContaaPagarComponent} from './contaapagar/contaapagar.component';
const routes: Routes = [
  {
    path: '', canActivate: [LoginService], children: [
      {path: '', component: HomeComponent},
      {path: 'perfil', component: PerfilComponent},
      {path: 'usuario', component: UsuarioComponent},
	    {path: 'cliente', component: ClienteComponent},
      {path: 'funcionario', component: FuncionarioComponent},
      {path: 'bairro', component: BairroComponent},
      {path: 'cidade', component: CidadeComponent},
      {path: 'imovel', component: ImovelComponent},
      {path: 'negociacao', component: NegociacaoComponent},
      {path: 'contaareceber', component: ContaaReceberComponent},
      {path: 'contaapagar', component: ContaaPagarComponent}
      
    ]
  },
  {path: 'login', component: LoginComponent}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);
