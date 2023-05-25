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

	constructor(private vendaService: VendaService) { }

	ngOnInit(): void {
			this.vendaService.findAll().subscribe((response: Venda[]) => {
				this.vendas = response.map(venda => Venda.fromJson(venda))
			})
	}

}
