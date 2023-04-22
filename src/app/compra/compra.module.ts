import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormularioComponent } from './formulario/formulario.component';
import { ProdutoCompraDialogComponent } from './produto-compra-dialog/produto-compra-dialog.component';


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
		DialogModule
	]
})
export class CompraModule { }
