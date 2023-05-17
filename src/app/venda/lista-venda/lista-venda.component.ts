import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-venda',
  templateUrl: './lista-venda.component.html',
  styleUrls: ['./lista-venda.component.css']
})
export class ListaVendaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
		this.vendaService.findAll()
			.subscribe(vendas => {
				this.listaVenda = vendas.map(vendas => Venda.fromJson(venda))
			})
	}

	getTotal(venda: Venda): number {
		let total = 0
		Venda.produtos.forEach(produto => {
			total = total + (produto.quantidade ? produto.quantidade : 0)
		})
		return total
	}

	getTotalProduto(venda: Venda): number {
		let total = 0
		venda.produtos.forEach(produto => {
			total += produto.valorTotal ? produto.valorTotal : 0
		})
		return total
	}
}
