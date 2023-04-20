import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/core/model/produto';
import { ProdutoService } from 'src/app/produto/produto.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

	produtosCadastrados = new Array<Produto>()
	produtosComprados = new Array<Produto>()

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
		this.produtoService.findAll().subscribe(
			response => {
				let produtosResponse = new Array<Produto>()
				for (const produto of response) {
					produtosResponse.push(Produto.fromJson(produto))
				}
				this.produtosCadastrados = produtosResponse
			}
		);
  }

}
