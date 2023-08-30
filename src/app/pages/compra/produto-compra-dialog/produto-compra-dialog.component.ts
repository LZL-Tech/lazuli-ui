import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompraProduto } from 'src/app/models/compra.produto';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-compra-dialog',
  templateUrl: './produto-compra-dialog.component.html',
  styleUrls: ['./produto-compra-dialog.component.css']
})
export class ProdutoCompraDialogComponent implements OnInit {

	@Input() visivel?: boolean
	@Output()	visivelChange = new EventEmitter<boolean>()
	@Output() adicionarProduto = new EventEmitter<CompraProduto>()

	@ViewChild('produtoCompradoForm') produtoCompradoForm!: NgForm;
	produtoComprado = new CompraProduto()
	produtosCadastrados = new Array<Produto>()
	results = new Array<Produto>()

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
		this.buscarProdutosCadastrados();
  }

	private buscarProdutosCadastrados() {
		let produtosResponse = new Array<Produto>();
		this.produtoService.findAll().subscribe(response => {
			for (const produto of response) {
				produtosResponse.push(Produto.fromJson(produto));
			}
			this.produtosCadastrados = produtosResponse;
		});
	}

	alterarVisibilidade() {
		this.visivel = this.visivel ? false : true
		this.visivelChange.emit(this.visivel)
	}

	// TODO: Buscar produtos da API
	buscarProdutoPorDescricao(busca: string) {
		this.produtoService.findByTipoProdutoAndDescricao(1, busca)
			.subscribe(response => {
				this.results = response.map(produto => Produto.fromJson(produto))
			})
	}

	adicionarProdutoComprado() {
		this.adicionarProduto.emit(this.produtoComprado)
		this.alterarVisibilidade()
		this.produtoComprado = new CompraProduto()
	}

	calcularPrecoTotal() {
		if (this.produtoComprado.quantidade && this.produtoComprado.valorUnidade) {
			this.produtoComprado.valorTotal = this.produtoComprado.quantidade * this.produtoComprado.valorUnidade
		}
	}

	calcularPrecoUnitario() {
		if (this.produtoComprado.quantidade && this.produtoComprado.valorTotal) {
			this.produtoComprado.valorUnidade =  parseFloat((this.produtoComprado.valorTotal / this.produtoComprado.quantidade).toFixed(2))
		}
	}

}
