import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';
import { DropdownModule } from 'primeng/primeng';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ContaaReceberComponent } from './contaareceber.component';
import { ContaaReceberService } from './contaareceber.service';
import { ImovelService } from '../imovel/imovel.service';
import { ClienteService } from '../cliente/cliente.service';
import { LoginService } from '../login/login.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    GrowlModule,
    DropdownModule
  ],
  declarations: [
    ContaaReceberComponent
  ],
  providers: [
    ContaaReceberService,
    ConfirmationService,
    ClienteService,
    ImovelService,
    LoginService
  ]
})
export class ContaaReceberModule {

}
