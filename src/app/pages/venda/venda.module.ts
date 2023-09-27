import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from "primeng/tooltip";

import { FormularioComponent } from './formulario/formulario.component';
import { ListaVendaComponent } from './lista-venda/lista-venda.component';
import { ProdutoVendaDialogComponent } from './produto-venda-dialog/produto-venda-dialog.component';



@NgModule({
	declarations: [
		FormularioComponent,
		ProdutoVendaDialogComponent,
		ListaVendaComponent
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
		MessagesModule,
		MessageModule,
		ProgressSpinnerModule,
		ToolbarModule,
		TableModule,
		TooltipModule,
	]
})
export class VendaModule { }
