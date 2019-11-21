import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { Perfil } from '../perfil/perfil';
import { PerfilService } from './../perfil/perfil.service';
import { ConfirmationService, Message } from 'primeng/api';
import { LoginService } from '../login/login.service';
import { Funcionario } from "../funcionario/funcionario";
import { FuncionarioService } from '../funcionario/funcionario.service';

@Component({
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  perfils: Perfil[];
  funcionarios: Funcionario[];
  showDialog = false;
  showConfirm = false;
  usuarioEdit = new Usuario();
  perfilEdit = new Perfil();
  msgs: Message[] = [];

  constructor(private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private funcionarioService: FuncionarioService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService) {
  }

  hasRole(role: string): boolean {
    return this.loginService.hasRole(role);
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.usuarioService.findAll().subscribe(e => this.usuarios = e);
    this.perfilService.findAll().subscribe(e => this.perfils = e);
    this.funcionarioService.findAll().subscribe(e => this.funcionarios = e);
  }

  novo() {
    this.showDialog = true;
    this.usuarioEdit = new Usuario();
  }

  salvar() {
    console.log(this.usuarioEdit);
    this.usuarioService.save(this.usuarioEdit).subscribe(e => {
      this.usuarioEdit = new Usuario();
      this.findAll();
      this.showDialog = false;
      this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro salvo com sucesso' }];
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Erro', detail: "Verifique campos obrigatórios, ou login já existente!" }];
      });
  }

  editar(usuario: Usuario) {
    usuario.authorities = null;
    this.usuarioEdit = usuario;
    this.showDialog = true;
    //this.msgs = [{severity: 'sucess', summary: 'Confirmado', detail: 'Registro alterado com sucesso'}];
  }

  confirmDelete(usuario: Usuario) {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.usuarioService.delete(usuario.id).subscribe(() => {
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
    this.usuarioService.findAll().subscribe(e => this.usuarios = e);
  }
}
