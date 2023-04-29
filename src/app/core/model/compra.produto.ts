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
}
