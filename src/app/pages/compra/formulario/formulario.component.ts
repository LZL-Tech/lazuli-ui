import { Component, OnInit } from '@angular/core';
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

  constructor(private compraService: CompraService, private messageService: MessageService) { }

  ngOnInit(): void { }

	onSubmit(compraForm: any) {
		if (!this.compra.produtos || this.compra.produtos.length === 0) {
			this.messageService.add({severity: 'warn', summary: 'Ops!', detail: 'É necessário informar ao menos um produto'})
		} else {

			this.compraService.save(this.compra)
				.subscribe(response => {
					this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Compra cadastrada'})
					this.compra = new Compra()
					compraForm.reset()
				})
		}
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