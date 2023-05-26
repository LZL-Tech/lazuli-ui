import { Component } from '@angular/core';
import { Compra } from 'src/app/core/model/compra';
import { CompraService } from '../compra.service';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css'],
})
export class ListaCompraComponent {

	listaCompra: Compra[] = [];
	cols: any[] = [
		{header: '#', field: 'idCompra'},
		{header: 'Fornecedor', field: 'fornecedor'},
		{header: 'Quantidade', field: 'quantidadeTotalProdutos'},
		{header: 'Gasto', field: 'totalGasto'},
		{header: 'Data', field: 'dataCompra'}
	]

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
		this.compraService.findAll()
			.subscribe(compras => {
				this.listaCompra = compras.map(compra => Compra.fromJson(compra))
			})
	}
}
