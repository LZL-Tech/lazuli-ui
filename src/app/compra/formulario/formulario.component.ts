import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/core/model/compra';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

	compra: Compra = new Compra()
	dataAtual = new Date()
	mostrarDialogProduto = false

  constructor() { }

  ngOnInit(): void {
  }

	onSubmit(compraForm: any) {
		console.log(this.compra)
	}

	adicionarProdutoCompradoDialog() {
		this.mostrarDialogProduto = true
	}

	adicionarProdutoComprado(produtoComprado: any) {
		console.log(produtoComprado)
		this.compra.produtos.push(produtoComprado)
	}

}
