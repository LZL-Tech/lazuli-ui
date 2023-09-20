import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TipoProdutoEnum } from 'src/app/enum/tipo.produto.enum';
import { Produto } from 'src/app/models/produto';
import { TipoProduto } from 'src/app/models/tipo.produto';
import { VendaProduto } from 'src/app/models/venda.produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { TipoProdutoService } from 'src/app/services/tipo-produto.service';

@Component({
  selector: 'app-produto-venda-dialog',
  templateUrl: './produto-venda-dialog.component.html',
  styleUrls: ['./produto-venda-dialog.component.css']
})
export class ProdutoVendaDialogComponent implements OnInit {

	@Input() visivel?: boolean;
	@Output()	visivelChange = new EventEmitter<boolean>();
	@Output() adicionarProduto = new EventEmitter<VendaProduto>();

	@ViewChild('produtoVendidoForm') produtoVendidoForm!: NgForm;
	produtoVendido = new VendaProduto();
	produtosCadastrados = new Array<Produto>();
	results = new Array<Produto>();

	idTipoProdutoVenda?: number;

  constructor(
    private produtoService: ProdutoService,
		private tipoProdutoService: TipoProdutoService
  ) { }


  ngOnInit() {
		this.getIdTipoProdutoVenda().then(idTipoProduto => this.idTipoProdutoVenda = idTipoProduto);
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

		this.produtoService.findByTipoProdutoAndDescricao(this.idTipoProdutoVenda!, busca)
			.subscribe(response => {
				this.results = response.map(produto => Produto.fromJson(produto))
			})
	}

	adicionarProdutoVendido() {
		this.adicionarProduto.emit(this.produtoVendido)
		this.alterarVisibilidade()
		this.produtoVendido = new VendaProduto()
	}

	async getIdTipoProdutoVenda(): Promise<number> {
		return this.getTiposProdutos().then(tiposProduto => {
			let tipoProdutoVenda = tiposProduto.find(tipoProduto => tipoProduto.descricao?.toUpperCase() === TipoProdutoEnum.PRODUTO_FINAL.toUpperCase());
			return tipoProdutoVenda?.idTipoProduto!;
		});
	}

	// Consulta tipos de produtos
	async getTiposProdutos(): Promise<TipoProduto[]> {
		let tiposProdutoPromise = new Promise<TipoProduto[]>((resolve, reject) => {
			this.tipoProdutoService.findAll().subscribe({
				next: response => {
					let tipos: TipoProduto[] = response.map(tipoProduto => TipoProduto.fromJson(tipoProduto));
					resolve(tipos);
				},
				error: error => {
					reject(error);
				}
			})
		});
		return tiposProdutoPromise;
	}
}
