import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaVendaComponent } from './lista-venda/lista-venda.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
		ListaVendaComponent
	],
  imports: [
    CommonModule,
		TableModule
  ]
})
export class VendaModule { }
