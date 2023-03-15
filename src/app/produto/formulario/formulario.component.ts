import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/core/model/produto';
import { TipoProduto } from 'src/app/core/model/tipo.produto';
import { UnidadeMedida } from 'src/app/core/model/unidade.medida';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

	produto = new Produto();

	// TODO: Obter tipos de produtos do back end
	tiposProduto: TipoProduto[] = [
		{
			idTipoProduto: 1,
			descricao: "Venda",
		},
		{
			idTipoProduto: 2,
			descricao: "Ingrediente"
		}
	];

	unidadesMedida: UnidadeMedida[] = [
		{descricao: 'Unidade', simbolo: 'UN'},
		{descricao: 'Kilograma', simbolo: 'KG'},
		{descricao: 'Litros', simbolo: 'LT'},
	]

  constructor() {
	}

  ngOnInit(): void {
  }

	onSubmit(produtoForm: NgForm) {
	}

}
