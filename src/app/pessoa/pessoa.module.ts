import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PessoaService} from './pessoa.service';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {CheckboxModule, Dropdown, DropdownModule, RadioButtonModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    DropdownModule,
  ],
  declarations: [
  ],
  providers: [
    PessoaService
  ]
})
export class PessoaModule {

}
