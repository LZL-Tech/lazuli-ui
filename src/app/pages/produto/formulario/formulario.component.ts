import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Produto } from 'src/app/models/produto';
import { TipoProduto } from 'src/app/models/tipo.produto';
import { UnidadeMedida } from 'src/app/models/unidade.medida';
import { ProdutoService } from 'src/app/services/produto.service';
import { TipoProdutoService } from 'src/app/services/tipo-produto.service';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.css'],
	providers: [MessageService]
})
export class FormularioComponent implements OnInit {

	idProduto!: number;
	produto = new Produto();


	tiposProduto: TipoProduto[] = new Array<TipoProduto>();
	unidadesMedida: UnidadeMedida[] = new Array<UnidadeMedida>();

	title!: string;
	mensagens: Message[] = new Array<Message>();
	isLoading: boolean = false;

	constructor(
		private produtoService: ProdutoService,
		private tipoProdutoService: TipoProdutoService,
		private unidadeMedidaService: UnidadeMedidaService,
		private messageService: MessageService,
		private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.isLoading = true;

		Promise.all([
			this.getTiposProduto(),
			this.getUnidadesMedida()
		]).then((values) => {
			this.tiposProduto = values[0];
			this.unidadesMedida = values[1];

			this.route.params.subscribe((params) => {
				if (params['id']) {
					this.idProduto = params['id'];
					this.title = "Editar produto";

					this.getProdutoById(this.idProduto)
						.then((produto) => {
							this.produto = produto;
							this.isLoading = false;
						})
						.catch((error) => {
							console.error(error);
							this.messageService.add({
								severity: 'error',
								summary: 'Ops!',
								detail: `Ocorreu um erro ao consultar os dados do produto`
							});
						});
				} else {
					this.title = "Cadastrar produto";
					this.isLoading = false;
				}
			});
		}).catch((error) => {
			console.error(error);
			this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Ocorreu um erro' });

			this.isLoading = false;
		});
	}

	onSubmit(produtoForm: NgForm) {
		this.removerAtributosPorTipoProduto()
		if (this.idProduto) {
			this.edit(this.produto);
		} else {
			this.produtoService.save(this.produto).subscribe(response => {
				if (response?.status === 201) {
					this.messageService.add({ severity: "success", summary: "Sucesso", detail: "Produto salvo" })
					produtoForm.reset()
				}
			});
		}
	}

	private removerAtributosPorTipoProduto() {
		if (this.isProdutoIngrediente()) {
			this.produto.preco = undefined;
		} else {
			this.produto.marca = undefined;
		}
	}

	isProdutoIngrediente(): boolean {
		return this.produto.tipoProduto?.descricao?.toUpperCase() === 'INGREDIENTE';
	}

	private getProdutoById(id: number): Promise<Produto> {
		let produtoPromise = new Promise<Produto>((resolve, reject) => {
			this.produtoService.findById(id).subscribe({
				next: (produto) => {
					resolve(Produto.fromJson(produto));
				},
				error: (erro) => {
					reject(erro);
				}
			})
		});
		return produtoPromise;
	}

	protected edit(produto: Produto): void {
		this.produtoService.update(this.idProduto, produto).subscribe({
			next: (resposta) => {
				this.messageService.add({ severity: "success", summary: "Sucesso", detail: `Produto ${produto.descricao} atualizado com sucesso` })
			},
			error: (erro) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocorreu um erro ao tentar atualizar o produto` });
			}
		});
	}

	private async getTiposProduto(): Promise<TipoProduto[]> {
		let tipos: TipoProduto[] = [];
		let tiposProdutoPromise = new Promise<TipoProduto[]>((resolve, reject) => {
			this.tipoProdutoService.findAll().subscribe({
				next(tiposResponse) {
					for (let tipo of tiposResponse) {
						tipos.push(TipoProduto.fromJson(tipo));
					}
					resolve(tipos);
				},
				error: (erro) => {
					console.log(erro);
					reject(erro);
				}
			});
		});
		return tiposProdutoPromise;
	}

	private async getUnidadesMedida(): Promise<UnidadeMedida[]> {
		let unidades: UnidadeMedida[] = [];
		let unidadePromise = new Promise<UnidadeMedida[]>((resolve, reject) => {
			this.unidadeMedidaService.findAll().subscribe({
				next(unidadesResponse) {
					for (let unidade of unidadesResponse) {
						unidades.push(UnidadeMedida.fromJson(unidade));
					}
					resolve(unidades);
				},
				error(erro) {
					console.log(erro);
					reject(erro);
				}
			});
		});
		return unidadePromise;
	}

}
