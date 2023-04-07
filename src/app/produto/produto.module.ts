import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioComponent } from './formulario/formulario.component';
import {TableModule} from 'primeng/table';

import { ListaComponent } from './lista/lista.component';

@NgModule({
	declarations: [FormularioComponent, ListaComponent],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		InputTextModule,
		InputTextModule,
		DropdownModule,
		ButtonModule,
		TableModule,
  ],
	providers: [
	]
})
export class ProdutoModule {}
