import { VendaProduto } from "./venda.produto"

export class Venda {
	idVenda?: number
	nomeCliente?: string
	dataVenda?: Date
	produtos: VendaProduto[] = new Array<VendaProduto>()

	get quantidadeTotalProdutos(): number {
		let total = 0;
		this.produtos?.forEach((vendaProduto) => {
			total += vendaProduto.quantidade ?? 0
		});
		return total;
	}

	get valorTotalVenda(): number {
		let total = 0;
		this.produtos?.forEach((vendaProduto: VendaProduto) => {
			total += vendaProduto.precoUnidade ?? 0;
		});
		return total;
	}

	toJson(): any {
		let produtosVendidos = this.produtos.map(produto => produto.toJson())
		return {
			id_venda: this.idVenda,
			nm_cliente: this.nomeCliente,
			dt_venda: this.dataVenda,
			venda_produto: produtosVendidos
		}
	}

	static fromJson(json: any): Venda {
		let venda = new Venda()
        venda.idVenda = json.id_venda
        venda.nomeCliente = json.nm_cliente
        venda.dataVenda = new Date(json.dt_venda.replace(" GMT", ""))
        venda.produtos = json.venda_produto.map((produtoVendido: VendaProduto) => VendaProduto.fromJson(produtoVendido))
        return venda
	}

}
