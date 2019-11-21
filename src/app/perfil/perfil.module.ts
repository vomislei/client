import { ConfirmationService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GrowlModule } from 'primeng/growl';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil.component';
import { PerfilService } from './perfil.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    CheckboxModule,
    ConfirmDialogModule,
    GrowlModule
  ],
  declarations: [
    PerfilComponent
  ],
  providers: [
    PerfilService,
    ConfirmationService
  ]
})
export class PerfilModule {

}
