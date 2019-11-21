import { Component, OnInit, ViewChild } from '@angular/core';


import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { Cliente } from '../cliente/cliente';
import { ClienteService } from '../cliente/cliente.service';
import { Imovel } from '../imovel/imovel';
import { ImovelService } from '../imovel/imovel.service';
import { Funcionario } from '../funcionario/funcionario';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { NegociacaoService } from './negociacao.service';
import { Negociacao } from './negociacao';
import { ContaaReceber } from '../contaareceber/contaaReceber';
import { ContaaReceberService } from '../contaareceber/contaaReceber.service';

@Component({
  templateUrl: './negociacao.component.html',
  styleUrls: ['./negociacao.component.css']
})
export class NegociacaoComponent implements OnInit {

  negociacaos: Negociacao[];
  negociacaoEdit = new Negociacao();
  clientes: Cliente[];
  clientesaux: Cliente[];
  imovels: Imovel[];
  funcionarios: Funcionario[];
  contaarecebers: ContaaReceber[];
  showDialog = false;
  showConfirm = false;
  msgs: Message[] = [];

  constructor(private negociacaoService: NegociacaoService,
    private clienteService: ClienteService,
    private imovelService: ImovelService,
    private funcionarioService: FuncionarioService,
    private confirmationService: ConfirmationService) {
  }


  ngOnInit(): void {
    console.log(this.negociacaos);
    this.negociacaoEdit = new Negociacao();
    this.negociacaoEdit.cliente = new Cliente();
    this.negociacaoEdit.imovel = new Imovel();
    this.negociacaoEdit.funcionario = new Funcionario();

    this.negociacaoService.findAll().subscribe(e => this.negociacaos = e);
    console.log(this.negociacaos);

    this.clienteService.findAll().subscribe(e => this.clientes = e);
    this.clienteService.findAll().subscribe(e => this.clientesaux = e);
    this.funcionarioService.findAll().subscribe(e => this.funcionarios = e);
  }


  findAll() {
    this.negociacaoService.findAll().subscribe(e => this.negociacaos = e);
    console.log(this.negociacaos);
  }

  buscaImoveis(cliente): void {
    this.imovelService.findByCliente(cliente).subscribe(c => this.imovels = c);
  }

  novo() {
    this.showDialog = true;
    this.negociacaoEdit = new Negociacao();
    this.negociacaoEdit.cliente = new Cliente();
    this.negociacaoEdit.imovel = new Imovel();
    this.negociacaoEdit.funcionario = new Funcionario();
  }

  saveNegociacao() {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja finalizar a negociação e gerar financeiro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.negociacaoEdit.datafim = this.negociacaoEdit.data;
        this.negociacaoService.save(this.negociacaoEdit).subscribe(e => {
          this.negociacaoEdit.datafim = this.negociacaoEdit.data;
          this.negociacaoEdit = new Negociacao();
          this.negociacaoEdit.cliente = new Cliente();
          this.negociacaoEdit.imovel = new Imovel();
          this.negociacaoEdit.funcionario = new Funcionario();
          this.showDialog = false;
          this.findAll();
          this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro removido com sucesso!' }];
        },
          error => {
            this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Este registro não pode ser removido!' }];
          });
      }
    });
  }




  salvar() {
    this.negociacaoEdit.datafim = null;
    this.negociacaoService.save(this.negociacaoEdit).subscribe(e => {
      this.negociacaoEdit.datafim = null;
      this.negociacaoEdit = new Negociacao();
      this.showDialog = false;
      this.findAll();
    });
  }
  /*
    buscaContaareceber(negociacao): void {
      this.contaaReceberService.findByNegociacao(negociacao).subscribe(c => this.contaarecebers = c);
    }*/

  editar(negociacao: Negociacao) {
    this.negociacaoEdit = negociacao;
    this.buscaImoveis(negociacao.imovel.cliente);
    //  this.buscaContaareceber(negociacao);
    this.showDialog = true;
  }

  confirmDelete(negociacao: Negociacao) {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.negociacaoService.delete(negociacao.id).subscribe(() => {
          this.findAll();
          this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro removido com sucesso!' }];
        },
          error => {
            this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Este registro não pode ser removido!' }];
          });
      }
    });
  }

  cancelar() {
    this.showDialog = false;
    this.findAll();
    this.negociacaoService.findAll().subscribe(e => this.negociacaos = e);
  }
}
