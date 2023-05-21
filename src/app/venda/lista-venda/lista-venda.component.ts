import { Component, OnInit } from '@angular/core';
import { Venda } from 'src/app/core/model/venda';
import { VendaProduto } from 'src/app/core/model/venda.produto';
import { VendaService } from './venda.service';

@Component({
	selector: 'app-lista-venda',
	templateUrl: './lista-venda.component.html',
	styleUrls: ['./lista-venda.component.css'],
})
export class ListaVendaComponent implements OnInit {

	vendas: Venda[] = new Array<Venda>()

	constructor(private vendaService: VendaService) { }

	ngOnInit(): void {
			this.vendaService.findAll().subscribe((response: Venda[]) => {
				console.log(`Response:`)
				console.log(response)
				this.vendas = response.map(venda => Venda.fromJson(venda))
				this.vendas.forEach(venda => console.log(typeof venda.dataVenda))
			})
	}

	getQuantidadeTotalProdutos(venda: Venda): number {
		let total = 0;
		venda.produtos?.forEach((vendaProduto) => {
			total += vendaProduto.quantidade ?? 0
		});
		return total;
	}

	getValorTotalVenda(venda: Venda): number {
		let total = 0;
		venda.produtos?.forEach((vendaProduto: VendaProduto) => {
			total += vendaProduto.precoUnidade ?? 0;
		});
		return total;
	}
}
