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

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
		this.compraService.findAll()
			.subscribe(compras => {
				this.listaCompra = compras.map(compra => Compra.fromJson(compra))
			})
	}

	getTotalProdutos(compra: Compra): number {
		let total = 0
		compra.produtos.forEach(produto => {
			total = total + (produto.quantidade ? produto.quantidade : 0)
		})
		return total
	}

	getTotalGasto(compra: Compra): number {
		let total = 0
		compra.produtos.forEach(produto => {
			total += produto.valorTotal ? produto.valorTotal : 0
		})
		return total
	}
}
