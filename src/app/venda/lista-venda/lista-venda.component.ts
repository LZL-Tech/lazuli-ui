import { Component, OnInit } from '@angular/core';
import { VendaService } from './lista-venda.service';
import { Venda } from 'src/app/core/model/venda';

@Component({
	selector: 'app-lista-venda',
	templateUrl: './lista-venda.component.html',
	styleUrls: ['./lista-venda.component.css'],
})
export class ListaVendaComponent implements OnInit {

	vendas: Venda[] = new Array<Venda>()

	constructor(private vendaService: VendaService) {}

	ngOnInit(): void {
		for (let index = 0; index < 5; index++) {
			let vendaJson = {
				id_venda: index,
				cliente: "Silvana",
				data_venda: new Date(),
				vl_total: Math.random()
			}
			this.vendas.push(Venda.fromJson(vendaJson))
		}
	}

	getTotal(venda: Venda): number {
		let total = 0;
		venda.vendaProdutos?.forEach((vendaProduto) => {
			total = total + (vendaProduto.quantidade ? vendaProduto.quantidade : 0);
		});
		return total;
	}

	getValorTotalVenda(venda: Venda): number {
		let total = 0;
		venda.vendaProdutos?.forEach((vendaProduto) => {
			total += vendaProduto.valorTotal ? vendaProduto.valorTotal : 0;
		});
		return total;
	}
}
