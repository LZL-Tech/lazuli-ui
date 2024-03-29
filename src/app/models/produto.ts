import { TipoProduto } from "./tipo.produto";
import { UnidadeMedida } from "./unidade.medida";

export class Produto {
	idProduto?: number;
	descricao?: string;
	marca?: string;
	quantidadeEstoque?: number;
	preco?: number;
	tipoProduto?: TipoProduto;
	unidadeMedida?: UnidadeMedida;

	toJson(): any {
		let produtoJson = {
			descricao: this.descricao,
			marca: this.marca,
			qtd_estoque: this.quantidadeEstoque,
			preco: this.preco,
			tipo_produto: this.tipoProduto?.toJson(),
			unidade_medida: this.unidadeMedida?.toJson()
		}
		return produtoJson
	}

	static fromJson(json: any): Produto {
		let produto: Produto = new Produto()
		produto.idProduto = json.id_produto
		produto.descricao = json.descricao
		if (json.marca)
			produto.marca = json.marca
		if (json.qtd_estoque)
			produto.quantidadeEstoque = json.qtd_estoque
		if (json.preco)
			produto.preco = json.preco
		if (json.tipo_produto)
			produto.tipoProduto = TipoProduto.fromJson(json.tipo_produto)
		if (json.unidade_medida)
			produto.unidadeMedida = UnidadeMedida.fromJson(json.unidade_medida)
		return produto
	}
}
