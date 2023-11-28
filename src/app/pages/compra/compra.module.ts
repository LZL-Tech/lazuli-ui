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

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ListaCompraComponent } from './lista-compra/lista-compra.component';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
	declarations: [
		FormularioComponent,
		ProdutoCompraDialogComponent,
		ListaCompraComponent
	],
	imports: [
		AutoCompleteModule,
		BlockUIModule,
		ButtonModule,
		CalendarModule,
		CommonModule,
		ConfirmDialogModule,
		DialogModule,
		FormsModule,
		InputTextModule,
		MessageModule,
		MessagesModule,
		ProgressSpinnerModule,
		TableModule,
		ToolbarModule,
		TooltipModule,
	]
})
export class CompraModule { }
