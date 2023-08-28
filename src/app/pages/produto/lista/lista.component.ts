import { Component } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
})
export class ListaComponent {

	produtos: Produto[] = []

	constructor(private produtoService: ProdutoService) {}

	ngOnInit(): void {
		this.produtoService.findAll().subscribe(produtos => {
			produtos.forEach(produto => this.produtos.push(Produto.fromJson(produto)))
		})
	}
}