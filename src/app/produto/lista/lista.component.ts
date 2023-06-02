import { Component } from '@angular/core';
import { Produto } from 'src/app/core/model/produto';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
})
export class ListaComponent {

	produtos: Produto[] = []

	constructor(private produtoService: ProdutoService, private router: Router) {}

	ngOnInit(): void {
		this.produtoService.findAll().subscribe(produtos => {
			produtos.forEach(produto => this.produtos.push(Produto.fromJson(produto)))
		})
	}

	editarProduto(produto: Produto): void {
		this.router.navigate(['/produto/editar', produto.idProduto])
	}
}
