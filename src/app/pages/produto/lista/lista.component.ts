import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
	providers: [MessageService]
})
export class ListaComponent {

	produtos: Produto[] = []
	mensagens: Message[] = new Array<Message>();

	isLoading = false;

	constructor(private produtoService: ProdutoService, private messageService: MessageService) {}

	ngOnInit(): void {
		this.isLoading = true;
		this.getProdutos().then(produtos => {
			this.produtos = produtos;
			this.isLoading = false;
		})
	}

	private async getProdutos() : Promise<Produto[]> {
		let produtos = []
		let response = await firstValueFrom(this.produtoService.findAll())
		for (let produto of response) {
			produtos.push(Produto.fromJson(produto));
		}
		return produtos;
	}
}
