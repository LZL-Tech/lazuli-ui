import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
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
		}).catch(error => {
			console.error(error);
			this.messageService.add({severity:'error', summary:'Ops!', detail: 'Ocorreu um erro ao consultar os produtos'});
			this.isLoading = false;
		});
	}

	private async getProdutos() : Promise<Produto[]> {
		let produtos: Produto[] = [];
		let promise = new Promise<Produto[]>((resolve, reject) => {
			this.produtoService.findAll().subscribe({
				next: (response) => {
					for (let produto of response) {
						produtos.push(Produto.fromJson(produto));
					}
					resolve(produtos);
				},
				error: (error) => {
					reject(error);
				}
			});
		});
		return promise;
	}

	protected delete(produto: Produto): void
	{
		this.produtoService.delete(produto?.idProduto ?? 0).subscribe({
			next: (resposta) => {
				this.isLoading = true;
				this.getProdutos().then(produtos => {
					this.produtos = produtos;
					this.isLoading = false;
				}).catch(error => {
					console.error(error);
					this.messageService.add({severity:'error', summary:'Ops!', detail: 'Ocorreu um erro ao consultar os produtos'});
					this.isLoading = false;
				});
				this.messageService.add({severity: "success", summary: "Sucesso", detail: `Produto ${produto.descricao} deletado com sucesso`});		
			},
			error: (erro) => {
				if (erro.status === 409) 
				{
					this.messageService.add({severity: 'error', summary: 'Conflito', detail: `${erro.error.message}`});
				} 
				else 
				{
					this.messageService.add({ severity: 'error', summary: 'Error', detail:  `Ocorreu um erro ao tentar deletar o produto`});
				}
			}
		}); 
	}
}
