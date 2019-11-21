import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ClienteComponent} from './cliente.component';
import {ClienteService} from './cliente.service';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {CheckboxModule, InputMaskModule} from 'primeng/primeng';
import {LoginService} from '../login/login.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {GrowlModule} from 'primeng/growl';
import {DropdownModule} from 'primeng/dropdown';      
import {RadioButtonModule} from 'primeng/radiobutton';   

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    CheckboxModule,
	InputMaskModule,
	ConfirmDialogModule,
  GrowlModule,
  RadioButtonModule,
  DropdownModule
  ],
  declarations: [
    ClienteComponent
  ],
  providers: [
    ClienteService,
	  LoginService,
	ConfirmationService
  ]
})
export class ClienteModule {

}
