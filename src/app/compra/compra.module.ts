import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { FormularioComponent } from './formulario/formulario.component';
import { ProdutoCompraDialogComponent } from './produto-compra-dialog/produto-compra-dialog.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';


@NgModule({
	declarations: [
		FormularioComponent,
		ProdutoCompraDialogComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ButtonModule,
		InputTextModule,
		CalendarModule,
		TableModule,
		DialogModule,
		ToolbarModule,
		AutoCompleteModule,
		MessageModule,
		MessagesModule
	]
})
export class CompraModule { }
