import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioComponent } from './formulario/formulario.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { TipoProdutoService } from './tipo-produto.service';


@NgModule({
  declarations: [
    FormularioComponent,
  ],
  imports: [
    CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		InputTextModule,
		InputTextModule,
		DropdownModule,
		ButtonModule
  ],
	providers: [
	]
})
export class ProdutoModule { }
