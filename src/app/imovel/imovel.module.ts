import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//imagem
//import {FileUploadModule} from '../../../node_modules/ng2-file-upload';



import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule, RadioButtonModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';


import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ClienteService } from '../cliente/cliente.service';
import { ImovelService } from './imovel.service';
import { ImovelComponent } from './imovel.component';
import { CidadeService } from '../cidade/cidade.service';
import { BairroService } from '../bairro/bairro.service';



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
    CheckboxModule,
    GrowlModule,
    ReactiveFormsModule
  ],
  declarations: [
    ImovelComponent
  ],
  providers: [
    ImovelService,
    ClienteService,
    CidadeService,
    BairroService,
    ConfirmationService
  ]
})
export class ImovelModule {

}
