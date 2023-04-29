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
}
