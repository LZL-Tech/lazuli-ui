import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BlockUIModule } from "primeng/blockui";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormularioComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';


@NgModule({
	declarations: [FormularioComponent, ListaComponent],
	imports: [
		AppRoutingModule,
		BlockUIModule,
		BrowserAnimationsModule,
		ButtonModule,
		CommonModule,
		ConfirmDialogModule,
		DropdownModule,
		FormsModule,
		InputTextModule,
		MessageModule,
		MessagesModule,
		ProgressSpinnerModule,
		TableModule,
  ],
	providers: [
	]
})
export class ProdutoModule {}
