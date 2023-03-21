import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/core/model/produto';
import { TipoProduto } from 'src/app/core/model/tipo.produto';
import { UnidadeMedida } from 'src/app/core/model/unidade.medida';
import { TipoProdutoService } from 'src/app/produto/tipo-produto.service';
import { UnidadeMedidaService } from '../unidade-medida.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

	produto = new Produto();

	// TODO: Obter tipos de produtos do back end
	tiposProduto: TipoProduto[] = new Array<TipoProduto>();

	unidadesMedida: UnidadeMedida[] = new Array<UnidadeMedida>();

  constructor(private tipoProdutoService: TipoProdutoService, private unidadeMedidaService: UnidadeMedidaService) {

  }

  ngOnInit(): void {
		this.tipoProdutoService.findAll().subscribe(tipos => this.tiposProduto = tipos);
		this.unidadeMedidaService.findAll().subscribe(unidades => this.unidadesMedida = unidades);
  }

	onSubmit(produtoForm: NgForm) {
	}

	isProdutoIngrediente(): boolean {
		return this.produto.tipoProduto?.descricao?.toUpperCase() === 'INGREDIENTE';
	}

}
