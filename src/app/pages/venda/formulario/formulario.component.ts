import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Venda } from 'src/app/models/venda';
import { VendaProduto } from 'src/app/models/venda.produto';
import { VendaService } from 'src/app/services/venda.service';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.css'],
	providers: [MessageService]
})
export class FormularioComponent implements OnInit {
	venda: Venda = new Venda()
	dataAtual = new Date()

	mostrarDialogProduto = false;
	vendaForm: any;
	isLoading = false;


	constructor(
		private vendaService: VendaService,
		private messageService: MessageService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.isLoading = true;
		try {
			let idVendaEditar = this.route.snapshot.params['id'];
			if (idVendaEditar) {
				this.getVendaById(idVendaEditar).then((venda: Venda) => {
					this.venda = venda;
					this.isLoading = false;
				})
			} else {
				this.isLoading = false;
			}
		} catch (error) {
			console.error(error);
			this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Ocorreu um erro ao consultar a venda' });
			this.isLoading = false;
		}
	}

	private getVendaById(idVendaEditar: number): Promise<Venda> {
		let vendaPromise = new Promise<Venda>((resolve, reject) => {
			this.vendaService.findById(idVendaEditar).subscribe({
				next: (response) => {
					this.venda = Venda.fromJson(response);
					resolve(this.venda);
				},
				error: (error) => {
					console.error(error);
					reject(error);
				}
			});
		});
		return vendaPromise;
	}

	onSubmit(vendaForm: any) {
		if (!this.venda.produtos || this.venda.produtos.length === 0) {
			this.messageService.add({ severity: 'warn', summary: 'Ops!', detail: 'É necessário informar ao menos um produto' })
		} else {
			if (this.venda.idVenda) {
				this.atualizarVenda(this.venda).then(() => {
					this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda atualizada' })
					this.venda = new Venda();
					vendaForm.reset()
				}).catch((error) => {
					console.error(error);
					this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Ocorreu um erro ao atualizar a venda' })
				});
			} else {
				this.vendaService.save(this.venda)
				.subscribe(response => {
					this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda cadastrada' })
					this.venda = new Venda()
					vendaForm.reset()
				});
			}
		}
	}

	atualizarVenda(venda: Venda): Promise<void> {
		let vendaPromise = new Promise<void>((resolve, reject) => {
			this.vendaService.update(venda).subscribe({
				next: (response) => {
					resolve();
				},
				error: (error) => {
					console.error(error);
					reject(error);
				}
			});
		});
		return vendaPromise;
	}

	adicionarProdutoVendidoDialog() {
		this.mostrarDialogProduto = true
	}

	adicionarProdutoVendido(produtoVendido: any) {
		this.venda.produtos.push(produtoVendido)
	}

	removerProdutoVendido(produtoVendido: VendaProduto) {
		this.venda.produtos = this.venda.produtos.filter(produto => produto != produtoVendido)
	}

}
