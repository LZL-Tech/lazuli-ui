import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { VendaProduto } from 'src/app/core/model/venda.produto';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/core/model/produto';
import { ProdutoService } from 'src/app/produto/produto.service';



@Component({
  selector: 'app-produto-venda-dialog',
  templateUrl: './produto-venda-dialog.component.html',
  styleUrls: ['./produto-venda-dialog.component.css']
})
export class ProdutoVendaDialogComponent implements OnInit {

	@Input() visivel?: boolean
	@Output()	visivelChange = new EventEmitter<boolean>()
	@Output() adicionarProduto = new EventEmitter<VendaProduto>()

	@ViewChild('produtoVendidoForm') produtoVendidoForm!: NgForm;
	produtoVendido = new VendaProduto()
	produtosCadastrados = new Array<Produto>()
	results = new Array<Produto>()

  constructor(
    private produtoService: ProdutoService
  ) { }


  ngOnInit() {
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


	buscarProdutoPorDescricao(busca: string) {
		this.produtoService.findByTipoProdutoAndDescricao(1, busca)
			.subscribe(response => {
				this.results = response.map(produto => Produto.fromJson(produto))
			})
	}

	adicionarProdutoVendido() {
		this.adicionarProduto.emit(this.produtoVendido)
		this.alterarVisibilidade()
		this.produtoVendido = new VendaProduto()
	}

	calcularPrecoTotal() {
		if (this.produtoVendido.quantidade && this.produtoVendido.precoUnidade) {
			this.produtoVendido.precoUnidade = this.produtoVendido.quantidade * this.produtoVendido.precoUnidade
		}
	}

	calcularPrecoUnitario() {
		if (this.produtoVendido.quantidade && this.produtoVendido.precoUnidade) {
			this.produtoVendido.precoUnidade =  parseFloat((this.produtoVendido.precoUnidade / this.produtoVendido.quantidade).toFixed(2))
		}
	}


}
