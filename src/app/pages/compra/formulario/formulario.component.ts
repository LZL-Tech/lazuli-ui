import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Compra } from 'src/app/models/compra';
import { CompraProduto } from 'src/app/models/compra.produto';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
	providers: [MessageService]
})
export class FormularioComponent implements OnInit {

	compra: Compra = new Compra()
	dataAtual = new Date()

	mostrarDialogProduto = false
	isLoading = false;

  constructor(private compraService: CompraService, private messageService: MessageService, private router: ActivatedRoute) { }

  ngOnInit(): void {
		this.isLoading = true;

		let idCompraEditar = this.router.snapshot.params['id'];
		if (idCompraEditar) {
			this.getCompraById(idCompraEditar)
				.then((compra: Compra) => {
					this.compra = compra;
				})
				.catch((error) => {
					this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Ocorreu um erro ao consultar os dados da compra' });
				})
				.finally(() => {
					this.isLoading = false;
				});
		}
	}

	onSubmit(compraForm: any) {
		if (!this.compra.produtos || this.compra.produtos.length === 0) {
			this.messageService.add({severity: 'warn', summary: 'Ops!', detail: 'É necessário informar ao menos um produto'})
		} else {
			if (this.compra.idCompra) {
				this.atualizarCompra(this.compra);
			}
			this.compraService.save(this.compra)
				.subscribe(response => {
					this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Compra cadastrada'})
					this.compra = new Compra()
					compraForm.reset()
				})
		}
	}

	private getCompraById(idCompra: number): Promise<Compra> {
		let compraPromise = new Promise<Compra>((resolve, reject) => {
			this.compraService.findById(idCompra).subscribe({
				next: (response) => {
					this.compra = Compra.fromJson(response);
					resolve(this.compra);
				},
				error: (error) => {
					console.error(error);
					reject(error);
				}
			});
		});
		return compraPromise;
	}

	atualizarCompra(compra: Compra): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.compraService.update(compra).subscribe({
				next: (response) => {
					resolve(response);
				},
				error: (error) => {
					console.error(error);
					this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Ocorreu um erro ao atualizar a compra' });
					reject(error);
				}
			});
		});
	}

	adicionarProdutoCompradoDialog() {
		this.mostrarDialogProduto = true
	}

	adicionarProdutoComprado(produtoComprado: any) {
		this.compra.produtos.push(produtoComprado)
	}

	removerProdutoComprado(produtoComprado: CompraProduto) {
		this.compra.produtos = this.compra.produtos.filter(produto => produto != produtoComprado)
	}

}
