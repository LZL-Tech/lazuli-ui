import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from "primeng/tooltip";

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FormularioComponent } from './formulario/formulario.component';
import { ProdutoCompraDialogComponent } from './produto-compra-dialog/produto-compra-dialog.component';

import { ListaCompraComponent } from './lista-compra/lista-compra.component';

@NgModule({
	declarations: [
		FormularioComponent,
		ProdutoCompraDialogComponent,
		ListaCompraComponent
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
		MessagesModule,
		TableModule,
		TooltipModule,
	]
})
export class CompraModule { }
