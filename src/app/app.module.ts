import {UsuarioModule} from './usuario/usuario.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpClientInterceptor} from './http-client.interceptor';
import {LoginService} from './login/login.service';
import {AppRouting} from './app-routing.module';
import {LoginModule} from './login/login.module';
import {HomeModule} from './home/home.module';
import {PerfilModule} from './perfil/perfil.module';
import {ClienteModule} from './cliente/cliente.module';
import {DropdownModule} from 'primeng/dropdown';
import {FuncionarioModule} from './funcionario/funcionario.module';
import {CidadeModule} from './cidade/cidade.module';
import {BairroModule} from './bairro/bairro.module';
import {ImovelModule} from './imovel/imovel.module';
import {NegociacaoModule} from './negociacao/negociacao.module';
import {ContaaReceberModule} from './contaareceber/contaareceber.module';
import {ContaaPagarModule} from './contaapagar/contaapagar.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    HttpClientModule,
    LoginModule,
    HomeModule,
    PerfilModule,
    UsuarioModule,
    ClienteModule,
    DropdownModule,
    FuncionarioModule,
    CidadeModule,
    BairroModule,
    ImovelModule,
    NegociacaoModule,
    ContaaReceberModule,
    ContaaPagarModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


