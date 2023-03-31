import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [FormularioComponent, ListaComponent],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		InputTextModule,
		InputTextModule,
		DropdownModule,
	],
})
export class ProdutoModule {}
