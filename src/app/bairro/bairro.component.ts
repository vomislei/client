import { Component, OnInit } from '@angular/core';
import { BairroService } from './bairro.service';
import { Bairro } from './bairro';
import { Cidade } from '../cidade/cidade';
import { CidadeService } from '../cidade/cidade.service';
import { LoginService } from '../login/login.service';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormControlName } from '@angular/forms';

@Component({
  templateUrl: './bairro.component.html',
  styleUrls: ['./bairro.component.css']
})
export class BairroComponent implements OnInit {

  bairros: Bairro[];
  showDialog = false;
  bairroEdit = new Bairro();
  cidades: Cidade[];
  msgs: Message[] = [];


  constructor(private bairroService: BairroService,
    private confirmationService: ConfirmationService,
    private cidadeService: CidadeService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.findAll();
    this.cidadeService.findAll().subscribe(e => this.cidades = e);
  }

  hasRole(role: string): boolean {
    return this.loginService.hasRole(role);
  }

  findAll() {
    this.bairroService.findAll().subscribe(e => this.bairros = e);
  }

  novo() {
    this.showDialog = true;
    this.bairroEdit = new Bairro();
  }

  salvar() {
    this.bairroService.save(this.bairroEdit).subscribe(e => {
      this.bairroEdit = new Bairro();
      this.findAll();
      this.showDialog = false;
      this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro salvo com sucesso!' }];
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Erro', detail: "Todos os campos com * são obrigatórios!" }];

      });
  }

  editar(bairro: Bairro) {
    this.bairroEdit = bairro;
    this.showDialog = true;
  }


  confirmDelete(bairro: Bairro) {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.bairroService.delete(bairro.id).subscribe(() => {
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
    this.bairroService.findAll().subscribe(e => this.bairros = e);
  }
}
