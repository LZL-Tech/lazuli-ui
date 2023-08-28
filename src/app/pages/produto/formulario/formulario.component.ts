import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

	produto = new Produto();

	tiposProduto: TipoProduto[] = new Array<TipoProduto>();

	unidadesMedida: UnidadeMedida[] = new Array<UnidadeMedida>();

	mensagens: Message[] = new Array<Message>();

  constructor(
		private produtoService: ProdutoService,
		private tipoProdutoService: TipoProdutoService,
		private unidadeMedidaService: UnidadeMedidaService,
		private messageService: MessageService) { }

  ngOnInit(): void {
		this.tipoProdutoService.findAll().subscribe(tipos => {
			tipos.forEach(tipo => {
				this.tiposProduto.push(TipoProduto.fromJson(tipo))
			});
		});
		this.unidadeMedidaService.findAll().subscribe(unidades => {
			unidades.forEach(unidade => {
				this.unidadesMedida.push(UnidadeMedida.fromJson(unidade))
			});
		});
  }

	onSubmit(produtoForm: NgForm) {
		console.log('Salvando produto')
		this.removerAtributosPorTipoProduto()
		this.produtoService.save(this.produto).subscribe(response => {
			if (response?.status === 201) {
				this.messageService.add({severity: "success", summary: "Sucesso", detail: "Produto salvo"})
				produtoForm.reset()
			}
		});
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

}
