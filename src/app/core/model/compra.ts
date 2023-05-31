import { CompraProduto } from './compra.produto'

export class Compra {
	idCompra?: number
	fornecedor?: string
	produtos: CompraProduto[] = new Array<CompraProduto>()
	dataCompra?: Date

	get quantidadeTotalProdutos(): number {
		let total = 0
		this.produtos.forEach(produto => {
			total = total + (produto.quantidade ? produto.quantidade : 0)
		})
		return total
	}

	get totalGasto(): number {
		let total = 0
		this.produtos.forEach(produto => {
			total += produto.valorTotal ? produto.valorTotal : 0
		})
		return total
	}

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
		compra.fornecedor = json.fornecedor
		compra.dataCompra = new Date(json.dt_compra.replace('-','/'))
		compra.produtos = json.produto.map((produtoComprado: CompraProduto) => CompraProduto.fromJson(produtoComprado))
		return compra
	}
}
