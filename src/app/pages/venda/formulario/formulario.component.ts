import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
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
	mostrarDialogProduto = false
	vendaForm: any;


	constructor(
		private vendaService: VendaService,
		private messageService: MessageService
	) { }

	ngOnInit(): void {
	}

	onSubmit(vendaForm: any) {
		if (!this.venda.produtos || this.venda.produtos.length === 0) {
			this.messageService.add({ severity: 'warn', summary: 'Ops!', detail: 'É necessário informar ao menos um produto' })
		} else {
			this.vendaService.save(this.venda)
				.subscribe(response => {
					this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Compra cadastrada' })
					this.venda = new Venda()
					vendaForm.reset()
				})
		}
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
