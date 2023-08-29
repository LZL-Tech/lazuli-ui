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

	title!: string;

	tiposProduto: TipoProduto[] = new Array<TipoProduto>();

	unidadesMedida: UnidadeMedida[] = new Array<UnidadeMedida>();

	mensagens: Message[] = new Array<Message>();

  constructor(
		private produtoService: ProdutoService,
		private tipoProdutoService: TipoProdutoService,
		private unidadeMedidaService: UnidadeMedidaService,
		private messageService: MessageService,
		private route: ActivatedRoute) { }

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
		this.route.params.subscribe((params) => {
			if(params['id'])
			{
				this.idProduto = params['id'];
				this.find(this.idProduto);
				this.title = "Editar produto";
			}
			else
			{
				this.title = "Cadastrar produto";
			}
		});
  }

	onSubmit(produtoForm: NgForm) {
		console.log('Salvando produto')
		this.removerAtributosPorTipoProduto()
		if(this.idProduto)
		{
			this.edit(this.produto);
		}
		else
		{
			this.produtoService.save(this.produto.toJson()).subscribe(response => {
				if (response?.status === 201) {
					this.messageService.add({severity: "success", summary: "Sucesso", detail: "Produto salvo"})
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

	private find(id: number): void
	{
		this.produtoService.findById(id).subscribe(produto => {
			this.produto = Produto.fromJson(produto);
		})
	}

	protected edit(produto: Produto): void
	{
		this.produtoService.update(this.idProduto, produto).subscribe({
			next: (resposta) => {
				this.messageService.add({severity: "success", summary: "Sucesso", detail: `Produto ${produto.descricao} atualizado com sucesso`})			
			},
			error: (erro) => {
			  this.messageService.add({ severity: 'error', summary: 'Error', detail:  `Ocorreu um erro ao tentar atualizar o produto`})
			}
		}); 
	}
}
