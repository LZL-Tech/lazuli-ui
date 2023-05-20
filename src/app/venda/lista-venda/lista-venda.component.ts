import { Component, OnInit } from '@angular/core';
import { VendaService } from './lista-venda.service';
import { Venda } from 'src/app/core/model/venda';
import { VendaProduto } from 'src/app/core/model/venda.produto';

@Component({
	selector: 'app-lista-venda',
	templateUrl: './lista-venda.component.html',
	styleUrls: ['./lista-venda.component.css'],
})
export class ListaVendaComponent implements OnInit {

	vendas: Venda[] = new Array<Venda>()

	constructor(private vendaService: VendaService) { }

	ngOnInit(): void {
		for (let index = 0; index < 5; index++) {
			this.vendaService.findAll().subscribe(response => {
				this.vendas = response
			})
		}
	}

	getTotal(venda: Venda): number {
		let total = 0;
		venda.produtos?.forEach((vendaProduto) => {
			total = total + (vendaProduto.quantidade ? vendaProduto.quantidade : 0);
		});
		return total;
	}

	getValorTotalVenda(venda: Venda): number {
		let total = 0;
		venda.produtos?.forEach((vendaProduto: VendaProduto) => {
			total += vendaProduto.precoUnidade ? vendaProduto.precoUnidade : 0;
		});
		return total;
	}
}
