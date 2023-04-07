import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/core/model/produto';
import { TipoProduto } from 'src/app/core/model/tipo.produto';
import { UnidadeMedida } from 'src/app/core/model/unidade.medida';
import { TipoProdutoService } from 'src/app/produto/tipo-produto.service';
import { ProdutoService } from '../produto.service';
import { UnidadeMedidaService } from '../unidade-medida.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

	produto = new Produto();

	tiposProduto: TipoProduto[] = new Array<TipoProduto>();

	unidadesMedida: UnidadeMedida[] = new Array<UnidadeMedida>();

  constructor(private produtoService: ProdutoService,private tipoProdutoService: TipoProdutoService, private unidadeMedidaService: UnidadeMedidaService) {

  }

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
		console.log(this.produto)
		console.log('Produto')
		this.removerAtributosPorTipoProduto()
		this.produtoService.save(this.produto).subscribe(response => console.log(response))
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
