import { Produto } from "./produto";

export class VendaProduto {
	produto?: Produto
	quantidade?: number
	precoUnidade?: number

    toJson() {
		const vendaProdutoJson = {
			produto: {
				id_produto: this.produto?.idProduto,
				descricao: this.produto?.descricao
			},
			quantidade: this.quantidade,
			precoUnidade: this.precoUnidade
		};
		return vendaProdutoJson
	}


    static fromJson(json: any): VendaProduto {
		let produtoVendido = new VendaProduto()
		produtoVendido.produto = Produto.fromJson(json)
		produtoVendido.quantidade = json.quantidade
		produtoVendido.precoUnidade = json.precoUnidade
		return produtoVendido
	}
}
