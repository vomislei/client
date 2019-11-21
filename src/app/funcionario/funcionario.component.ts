import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario';
import { Cidade } from '../cidade/cidade';
import { CidadeService } from '../cidade/cidade.service';
import { LoginService } from '../login/login.service';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Bairro } from '../bairro/bairro';
import { BairroService } from '../bairro/bairro.service';

@Component({
	templateUrl: './funcionario.component.html',
	styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

	funcionarios: Funcionario[];
	showDialog = false;
	showConfirm = false;
	funcionarioEdit = new Funcionario();
	cidades: Cidade[];
	bairros: Bairro[];
	msgs: Message[] = [];

	constructor(private funcionarioService: FuncionarioService,
		private confirmationService: ConfirmationService,
		private cidadeService: CidadeService,
		private bairroservice: BairroService,
		private loginService: LoginService) {
	}

	ngOnInit(): void {
		this.findAll();
		this.funcionarioEdit= new Funcionario();
		this.funcionarioEdit.bairro = new Bairro();
		this.funcionarioEdit.bairro.cidade = new Cidade();
		
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
		this.funcionarioService.findAll().subscribe(e => this.funcionarios = e);
	}

	buscaBairros(cidade): void {
		this.bairroservice.findByCidade(cidade).subscribe(c => this.bairros = c);
	  }

	novo() {
		this.showDialog = true;
		this.funcionarioEdit = new Funcionario();
		this.funcionarioEdit.bairro = new Bairro();
		this.funcionarioEdit.bairro.cidade = new Cidade();
	}

	salvar() {
		this.funcionarioService.save(this.funcionarioEdit).subscribe(e => {
			this.funcionarioEdit = new Funcionario();
			this.funcionarioEdit.bairro = new Bairro();
			this.funcionarioEdit.bairro.cidade = new Cidade();
			this.findAll();
			this.showDialog = false;

			this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro salvo com sucesso' }];
		},
			error => {
				this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Certifique-se de preencher todos os campos.' }];
			}
		);
	}

	editar(funcionario: Funcionario) {
		this.funcionarioEdit = funcionario;
		this.buscaBairros(funcionario.bairro.cidade);
		this.showDialog = true;
	}

	confirmDelete(funcionario: Funcionario) {
		this.confirmationService.confirm({
			message: 'Essa ação não poderá ser desfeita',
			header: 'Deseja remover esse registro?',
			acceptLabel: 'Sim', rejectLabel: 'Não',
			accept: () => {
				this.funcionarioService.delete(funcionario.id).subscribe(() => {
					this.findAll();
					this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro removido com sucesso' }];
				});
			}
		});
	}
}
