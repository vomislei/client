import { Component, OnInit } from '@angular/core';
import { ContaaReceberService } from './contaareceber.service';
import { ContaaReceber } from './contaareceber';
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
  templateUrl: './contaareceber.component.html',
  styleUrls: ['./contaareceber.component.css']
})
export class ContaaReceberComponent implements OnInit {

  search: string;
  contaarecebers: ContaaReceber[];
  contaarecebersFiltered: ContaaReceber[];
  negociacaos: Negociacao[];
  clientes: Cliente[];
  imovels: Imovel[];
  showDialog = false;
  showConfirm = false;
  contaareceberEdit = new ContaaReceber();
  msgs: Message[] = [];

  constructor(private contaareceberService: ContaaReceberService,
    private negociacaoService: NegociacaoService,
    private imovelService: ImovelService,
    private clienteService: ClienteService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.contaareceberEdit = new ContaaReceber();
    this.contaareceberEdit.negociacao = new Negociacao();
    this.contaareceberEdit.negociacao.cliente = new Cliente();
    this.contaareceberEdit.negociacao.imovel = new Imovel();
    this.findAll();
    this.contaareceberService.findAll().subscribe(e => {
      this.contaarecebers = e;
      this.contaarecebersFiltered = e;
    });
    this.negociacaoService.findAll().subscribe(e => this.negociacaos = e);
    this.clienteService.findAll().subscribe(e => this.clientes = e);
  }

  hasRole(role: string): boolean {
    return this.loginService.hasRole(role);
  }

  findAll() {
    this.contaareceberService.findAll().subscribe(e => this.contaarecebers = e);
  }

  novo() {
    this.showDialog = true;
    this.contaareceberEdit = new ContaaReceber();
    this.contaareceberEdit.negociacao = new Negociacao();
    this.contaareceberEdit.negociacao.cliente = new Cliente();
    this.contaareceberEdit.negociacao.imovel = new Imovel();
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja quitar essa conta?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.contaareceberEdit.status = 1;
        this.contaareceberService.save(this.contaareceberEdit).subscribe(e => {
          this.contaareceberEdit = new ContaaReceber();
          this.contaareceberEdit.negociacao = new Negociacao();
          this.contaareceberEdit.negociacao.cliente = new Cliente();
          this.contaareceberEdit.negociacao.imovel = new Imovel();
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

  editar(contaareceber: ContaaReceber) {
    this.contaareceberEdit = contaareceber;
    this.showDialog = true;
  }


  confirmDelete(contaareceber: ContaaReceber) {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.contaareceberService.delete(contaareceber.id).subscribe(() => {
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
    this.contaareceberService.findAll().subscribe(e => this.contaarecebers = e);
  }

  updateValue() {
    this.contaarecebersFiltered =  this.contaarecebers.filter(
      p => p.negociacao.cliente.nome.includes(this.search));
  }
}
