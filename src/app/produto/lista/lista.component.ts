import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/core/model/produto';
import { TipoProduto } from 'src/app/core/model/tipo.produto';
import { UnidadeMedida } from 'src/app/core/model/unidade.medida';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
})
export class ListaComponent {
	lista_add_produtos = [
		{
			descricao: 'Pão de Mel',
			id_tipo_produto: 1,
			marca: 'Confeitaria Delícia',
			qtd_estoque: 20,
			id_unidade_medida: 1,
			preco: 4.5,
		},
		{
			descricao: 'Brigadeiro',
			id_tipo_produto: 2,
			marca: 'Confeitaria Doce Sabor',
			qtd_estoque: 100,
			id_unidade_medida: 2,
			preco: 3.5,
		},
		{
			descricao: 'Torta de Morango',
			id_tipo_produto: 1,
			marca: 'Confeitaria Saborosa',
			qtd_estoque: 5,
			id_unidade_medida: 1,
			preco: 35.0,
		},
		{
			descricao: 'Bolo de chocolate',
			id_tipo_produto: 1,
			marca: 'Confeitaria Delícia',
			qtd_estoque: 10,
			id_unidade_medida: 1,
			preco: 50.0,
		},
	];

	constructor() {}

	ngOnInit(): void {}
}
