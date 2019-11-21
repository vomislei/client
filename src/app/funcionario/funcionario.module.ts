import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioService } from './funcionario.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { LoginService } from '../login/login.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    TableModule,
    DialogModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    ConfirmDialogModule,
    RadioButtonModule,
    GrowlModule
  ],
  declarations: [
    FuncionarioComponent
  ],
  providers: [
    FuncionarioService,
    LoginService,
    ConfirmationService
  ]
})
export class FuncionarioModule {

}
