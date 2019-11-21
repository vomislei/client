import { Component, OnInit } from '@angular/core';
import { ContaaPagarService } from './contaapagar.service';
import { ContaaPagar } from './contaapagar';
import { LoginService } from '../login/login.service'; 
import { Message } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { NegociacaoService } from '../negociacao/negociacao.service';
import { ImovelService } from '../imovel/imovel.service';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from '../cliente/cliente';
import { Imovel } from '../imovel/imovel';
import { Negociacao } from '../negociacao/negociacao';

@Component({
  templateUrl: './contaapagar.component.html',
  styleUrls: ['./contaapagar.component.css']
})
export class ContaaPagarComponent implements OnInit {

  contaapagars: ContaaPagar[];
  negociacaos: Negociacao[];
  clientes: Cliente[];
  imovels: Imovel[];
  showDialog = false;
  showConfirm = false;
  contaapagarEdit = new ContaaPagar();
  msgs: Message[] = [];

  constructor(private contaapagarService: ContaaPagarService,
    private negociacaoService: NegociacaoService,
    private imovelService: ImovelService,
    private clienteService: ClienteService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.contaapagarEdit = new ContaaPagar();
    this.contaapagarEdit.negociacao = new Negociacao();
    this.contaapagarEdit.negociacao.cliente = new Cliente();
    this.contaapagarEdit.negociacao.imovel = new Imovel();
    
    this.findAll();
    this.contaapagarService.findAll().subscribe(e => this.contaapagars = e);
    this.negociacaoService.findAll().subscribe(e => this.negociacaos = e);
    this.clienteService.findAll().subscribe(e => this.clientes = e);
  }

  hasRole(role: string): boolean {
    return this.loginService.hasRole(role);
  }

  findAll() {
    this.contaapagarService.findAll().subscribe(e => this.contaapagars = e);
  }

  novo() {
    this.showDialog = true;
    this.contaapagarEdit = new ContaaPagar();
    this.contaapagarEdit.negociacao = new Negociacao();
    this.contaapagarEdit.negociacao.cliente = new Cliente();
    this.contaapagarEdit.negociacao.imovel = new Imovel();
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja quitar essa conta?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.contaapagarService.save(this.contaapagarEdit).subscribe(e => {
          this.contaapagarEdit = new ContaaPagar();
          this.contaapagarEdit.negociacao = new Negociacao();
          this.contaapagarEdit.negociacao.cliente = new Cliente();
          this.contaapagarEdit.negociacao.imovel = new Imovel();
          this.findAll();
          this.showDialog = false;
          this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Conta quitada com sucesso!' }];
        },
          error => {
            this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro na baixa do titulo!' }];
          });
      }
    });
  }

  editar(contaapagar: ContaaPagar) {
    this.contaapagarEdit = contaapagar;
    this.contaapagarEdit = new ContaaPagar();
    this.contaapagarEdit.negociacao = new Negociacao();
    this.contaapagarEdit.negociacao.cliente = new Cliente();
    this.contaapagarEdit.negociacao.imovel = new Imovel();
    this.showDialog = true;
  }


  confirmDelete(contaapagar: ContaaPagar) {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.contaapagarService.delete(contaapagar.id).subscribe(() => {
          this.findAll();
          this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro removido com sucesso' }];
        },
          error => {
            this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Este registro não pode ser removido!' }];
          });
      }
    });
  }
  cancelar() {
    this.showDialog = false;
    this.contaapagarService.findAll().subscribe(e => this.contaapagars = e);
  }
}
