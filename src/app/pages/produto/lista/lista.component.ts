import { Component } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { Message, MessageService } from 'primeng/api';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
	providers: [MessageService]
})
export class ListaComponent {

	produtos: Produto[] = []
	mensagens: Message[] = new Array<Message>();

	constructor(private produtoService: ProdutoService, private messageService: MessageService) {}

	ngOnInit(): void {
		this.listAll();
	}

	private listAll() : void
	{
		this.produtos = []
		this.produtoService.findAll().subscribe(produtos => {
			produtos.forEach(produto => this.produtos.push(Produto.fromJson(produto)))
		})
	}
}
