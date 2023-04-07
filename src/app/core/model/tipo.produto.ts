export class TipoProduto {
	idTipoProduto?: number;
	descricao?: string;

	toJson(): any {
		return {
			descricao: this.descricao,
			id_tipo_produto: this.idTipoProduto
		}
	}

	static fromJson(json: any): TipoProduto {
		let tipoProduto = new TipoProduto()
		tipoProduto.idTipoProduto = json.id_tipo_produto
		tipoProduto.descricao = json.descricao
		return tipoProduto
	}
}
