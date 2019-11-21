import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { Perfil } from './perfil';
import { ConfirmationService, Message } from 'primeng/api';
import { LoginService } from '../login/login.service';


@Component({
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfils: Perfil[];
  showDialog = false;
  perfilEdit = new Perfil();
  msgs: Message[] = [];

  constructor(private perfilService: PerfilService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService) { }

  hasRole(role: string): boolean {
    return this.loginService.hasRole(role);
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.perfilService.findAll().subscribe(e => this.perfils = e);
  }

  novo() {
    this.showDialog = true;
    this.perfilEdit = new Perfil();
  }

  salvar() {
    this.perfilService.save(this.perfilEdit).subscribe(e => {
      this.perfilEdit = new Perfil();
      this.findAll();
      this.showDialog = false;
      this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro salvo com sucesso' }];
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Erro', detail: "Preencha os campos obrigatórios!" }];
      });
  }

  editar(perfil: Perfil) {
    this.perfilEdit = perfil;
    this.showDialog = true;
  }

  confirmDelete(perfil: Perfil) {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.perfilService.delete(perfil.id).subscribe(() => {
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
    this.perfilService.findAll().subscribe(e => this.perfils = e);
  }
}