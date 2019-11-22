import { Component, OnInit } from '@angular/core';
import { CidadeService } from './cidade.service';
import { Cidade } from './cidade';
import { LoginService } from '../login/login.service';
import { Message } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {

  cidades: Cidade[];
  showDialog = false;
  showConfirm = false;
  cidadeEdit = new Cidade();
  msgs: Message[] = [];

  constructor(private cidadeService: CidadeService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  hasRole(role: string): boolean {
    return this.loginService.hasRole(role);
  }

  findAll() {
    this.cidadeService.findAll().subscribe(e => this.cidades = e);
  }

  novo() {
    this.showDialog = true;
    this.cidadeEdit = new Cidade();
  }

  salvar() {
    this.cidadeService.save(this.cidadeEdit).subscribe(e => {
      this.cidadeEdit = new Cidade();
      this.findAll();
      this.showDialog = false;
      this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro salvo com sucesso!' }];
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Erro', detail: "Todos os campos com * são obrigatórios!" }];
      });
  }

  editar(cidade: Cidade) {
    this.cidadeEdit = cidade;
    this.showDialog = true;
    this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro alterado com sucesso' }];
  }


  confirmDelete(cidade: Cidade) {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.cidadeService.delete(cidade.id).subscribe(() => {
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
    this.cidadeService.findAll().subscribe(e => this.cidades = e);
  }
}
