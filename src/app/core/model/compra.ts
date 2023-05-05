import { CompraProduto } from './compra.produto'

export class Compra {
	idCompra?: number
	fornecedor?: string
	produtos: CompraProduto[] = new Array<CompraProduto>()
	dataCompra?: Date

	toJson(): any {
		let produtosComprados = this.produtos.map(produto => produto.toJson())
		return {
			fornecedor: this.fornecedor,
			dt_compra: this.dataCompra,
			compra_produto: produtosComprados
		}
	}

	static fromJson(json: any): Compra {
		let compra = new Compra()
		compra.idCompra = json.id_compra
		compra.dataCompra = json.dt_compra
		compra.fornecedor = json.fornecedor
		compra.produtos = json.produto.map((produtoComprado: CompraProduto) => CompraProduto.fromJson(produtoComprado))
		return compra
	}
}
