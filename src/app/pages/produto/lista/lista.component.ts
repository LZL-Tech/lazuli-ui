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

	protected delete(produto: Produto): void
	{
		this.produtoService.delete(produto?.idProduto ?? 0).subscribe({
			next: (resposta) => {
				this.listAll();
				this.messageService.add({severity: "success", summary: "Sucesso", detail: `Produto ${produto.descricao} deletado com sucesso`})			
			},
			error: (erro) => {
			  this.messageService.add({ severity: 'error', summary: 'Error', detail:  `Ocorreu um erro ao tentar deletar o produto`})
			}
		}); 
	}
}
