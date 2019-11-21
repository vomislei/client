import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { NegociacaoService } from './negociacao.service';
import { NegociacaoComponent } from './negociacao.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule, InputMaskModule, RadioButtonModule, GrowlModule } from 'primeng/primeng';
import { ClienteService } from '../cliente/cliente.service';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { ImovelService } from '../imovel/imovel.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    InputMaskModule,
    AmChartsModule,
    RadioButtonModule,
    ConfirmDialogModule,
    TabViewModule,
    GrowlModule
  ],
  declarations: [
    NegociacaoComponent
  ],
  providers: [
    NegociacaoService,
    ClienteService,
    ImovelService,
    FuncionarioService,
    ConfirmationService
  ]
})
export class NegociacaoModule {

}
