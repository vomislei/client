import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import { CidadeService } from '../cidade/cidade.service';
import { Cidade } from '../cidade/cidade';
import { LoginService } from '../login/login.service';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { BairroService } from '../bairro/bairro.service';
import { Bairro } from '../bairro/bairro';

@Component({
	templateUrl: './cliente.component.html',
	styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

	clientes: Cliente[];
	showDialog = false;
	showConfirm = false;
	clienteEdit = new Cliente();
	cidades: Cidade[];
	bairros: Bairro[];
	msgs: Message[] = [];



	constructor(private clienteService: ClienteService,
		private confirmationService: ConfirmationService,
		private cidadeService: CidadeService,
		private bairroService: BairroService,
		private loginService: LoginService) {
	}

	ngOnInit(): void {
		this.findAll();

		this.clienteEdit = new Cliente();
		this.clienteEdit.bairro = new Bairro();
		this.clienteEdit.bairro.cidade = new Cidade();

		this.cidadeService.findAll().subscribe(e => this.cidades = e);
	}

	hasRole(role: string): boolean {
		return this.loginService.hasRole(role);
	}

	mostrarConfirm(condicao: boolean) {
		this.showConfirm = condicao;
	}

	get userInfo(): any {
		return this.loginService.getUserInfo();
	}

	findAll() {
		this.clienteService.findAll().subscribe(e => this.clientes = e);
	}

	buscaBairros(cidade): void {
		this.bairroService.findByCidade(cidade).subscribe(c => this.bairros = c);
	}

	novo() {
		this.showDialog = true;
		this.clienteEdit = new Cliente();
		this.clienteEdit.bairro = new Bairro();
		this.clienteEdit.bairro.cidade = new Cidade();
	}

	salvar() {
		this.clienteService.save(this.clienteEdit).subscribe(e => {
			this.clienteEdit = new Cliente();
			this.clienteEdit.bairro = new Bairro();
			this.clienteEdit.bairro.cidade = new Cidade();
			this.findAll();
			this.showDialog = false;

			this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro salvo com sucesso' }];
		},
			error => {
				this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Certifique-se de preencher todos os campos.' }];
			}
		);
	}


	editar(cliente: Cliente) {
		this.clienteEdit = cliente;
		this.buscaBairros(cliente.bairro.cidade);
		this.showDialog = true;
	}


	remover(cliente: Cliente) {
		this.clienteService.delete(cliente.id).subscribe(() => {
			this.findAll();
			this.showConfirm = false;
		});
	}

	confirmDelete(cliente: Cliente) {
		this.confirmationService.confirm({
			message: 'Essa ação não poderá ser desfeita',
			header: 'Deseja remover esse registro?',
			acceptLabel: 'Sim', rejectLabel: 'Não',
			accept: () => {
				this.clienteService.delete(cliente.id).subscribe(() => {
					this.findAll();
					this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro removido com sucesso' }];
				});
			}
		});
	}
}
