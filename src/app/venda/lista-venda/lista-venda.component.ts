import { Component, OnInit } from '@angular/core';
import { VendaService } from './lista-venda.service';

@Component({
	selector: 'app-lista-venda',
	templateUrl: './lista-venda.component.html',
	styleUrls: ['./lista-venda.component.css'],
})
export class vendaService implements OnInit {
	vendas: Venda[] = [];
	constructor(private vendaService: VendaService) {}

	ngOnInit(): void {
		this.vendaService.findAll().subscribe((vendas) => {
			this.vendas = vendas.map((vendas) => Venda.fromJson(vendas));
		});
	}

	getTotal(venda: Venda): number {
		let total = 0;
		venda.produtos.forEach((produto) => {
			total = total + (produto.quantidade ? produto.quantidade : 0);
		});
		return total;
	}

	getTotalProduto(venda: Venda): number {
		let total = 0;
		venda.produtos.forEach((produto) => {
			total += produto.valorTotal ? produto.valorTotal : 0;
		});
		return total;
	}
}
