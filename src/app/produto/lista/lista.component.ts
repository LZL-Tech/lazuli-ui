import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/core/model/produto';
import { TipoProduto } from 'src/app/core/model/tipo.produto';
import { UnidadeMedida } from 'src/app/core/model/unidade.medida';
import { ProdutoService } from '../produto.service';

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
			console.log(produtos)
		})
	}
}
