import { VendaProduto } from "./venda.produto"

export class Venda {
	idVenda?: number
	nmCliente?: string
	dtVenda?: Date
    produtos: VendaProduto[] = new Array<VendaProduto>()

	toJson(): any {
		let produtosVendidos = this.produtos.map(produto => produto.toJson())
        return {
			id_venda: this.idVenda,
			nm_cliente: this.nmCliente,
			dt_venda: this.dtVenda,
            compra_produto: produtosVendidos
		}
	}

	static fromJson(json: any): Venda {
		let venda = new Venda()
        venda.idVenda = json.id_venda
        venda.nmCliente = json.nm_cliente
        venda.dtVenda = json.dt_venda
        venda.produtos = json.produto.map((produtoVendido: VendaProduto) => VendaProduto.fromJson(produtoVendido))
        return venda
	}

}