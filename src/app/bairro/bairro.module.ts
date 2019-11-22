import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';
import { DropdownModule } from 'primeng/primeng';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {MessagesModule} from 'primeng/components/messages/messages';
import {MessageModule} from 'primeng/components/message/message';

import { BairroComponent } from './bairro.component';
import { BairroService } from './bairro.service';
import { CidadeService } from '../cidade/cidade.service';
import { LoginService } from '../login/login.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    GrowlModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [
    BairroComponent
  ],
  providers: [
    BairroService,
    CidadeService,
    LoginService,
    ConfirmationService
  ]
})
export class BairroModule {

}
