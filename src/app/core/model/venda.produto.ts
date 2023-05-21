import { Produto } from "./produto";

export class VendaProduto {
	produto?: Produto
	quantidade?: number
	precoUnidade?: number

	toJson() {
		const vendaProdutoJson = {
			id_produto: this.produto?.idProduto,
			quantidade: this.quantidade,
			preco_unidade: this.precoUnidade
		};
		return vendaProdutoJson
	}


	static fromJson(json: any): VendaProduto {
		let produtoVendido = new VendaProduto()
		produtoVendido.produto = Produto.fromJson(json)
		produtoVendido.quantidade = json.quantidade
		produtoVendido.precoUnidade = json.preco_unidade
		return produtoVendido
	}
}
