import { Component, OnInit } from '@angular/core';
import { Venda } from 'src/app/core/model/venda';
import { VendaService } from '../venda.service';

@Component({
	selector: 'app-lista-venda',
	templateUrl: './lista-venda.component.html',
	styleUrls: ['./lista-venda.component.css'],
})
export class ListaVendaComponent implements OnInit {

	vendas: Venda[] = new Array<Venda>()
	cols: any[] = []

	constructor(private vendaService: VendaService) { }

	ngOnInit(): void {
		this.vendaService.findAll().subscribe((response: Venda[]) => {
			this.vendas = response.map(venda => Venda.fromJson(venda))

			this.cols = [
				{header: '#', field: 'idVenda'},
				{header: 'Cliente', field: 'nomeCliente'},
				{header: 'Data', field: 'dataVenda'},
				{header: 'Qtd. Produtos', field: 'quantidadeTotalProdutos'},
				{header: 'Total', field: 'valorTotalVenda'},
			]
		})
	}

}
