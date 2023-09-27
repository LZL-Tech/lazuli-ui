import { Component } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
	providers: [MessageService, ConfirmationService]
})
export class ListaComponent {

	produtos: Produto[] = []
	mensagens: Message[] = new Array<Message>();

	isLoading = false;

	constructor(
		private produtoService: ProdutoService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {}

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

	confirmaDialogExcluir(idProduto: number): void {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir o produto?',
			accept: () => {
				this.isLoading = true;
				this.delete(idProduto).then(() => {
					this.messageService.add({severity: "success", summary: "Sucesso", detail: `Produto excluido com sucesso`});
					this.getProdutos().then(produtos => {
						this.produtos = produtos;
						this.isLoading = false;
					}).catch(error => {
						console.error(error);
						this.messageService.add({severity:'error', summary:'Ops!', detail: 'Ocorreu um erro ao consultar os produtos'});
						this.isLoading = false;
					});
					this.isLoading = false;
				}).catch(error => {
					console.error(error);
					this.messageService.add({severity:'error', summary:'Ops!', detail: 'Ocorreu um erro ao deletar o produto'});
					this.isLoading = false;
				});
			}
		});
	}

	delete(idProduto: number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.produtoService.delete(idProduto).subscribe({
				next: (response) => {
					resolve();
				},
				error: (error) => {
					reject(error);
				}
			});
		});
	}
}
