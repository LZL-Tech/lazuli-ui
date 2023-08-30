import { Produto } from "./produto";

export class CompraProduto {
	produto?: Produto
	quantidade?: number
	valorUnidade?: number
	valorTotal?: number

	toJson() {
		const compraProdutoJson = {
			produto: {
				id_produto: this.produto?.idProduto,
				descricao: this.produto?.descricao
			},
			quantidade: this.quantidade,
			vl_unidade: this.valorUnidade,
			vl_total: this.valorTotal
		};
		return compraProdutoJson
	}

	static fromJson(json: any): CompraProduto {
		let produtoComprado = new CompraProduto()
		produtoComprado.produto = Produto.fromJson(json)
		produtoComprado.quantidade = json.quantidade
		produtoComprado.valorTotal = json.vl_total
		produtoComprado.valorUnidade = json.vl_unidade

		return produtoComprado
	}
}
