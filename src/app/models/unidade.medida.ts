export class UnidadeMedida {
	idUnidadeMedida?: number
	descricao?: string;
	simbolo?: string;

	toJson(): any {
		return {
			id_unidade_medida: this.idUnidadeMedida,
			descricao: this.descricao,
			simbolo: this.simbolo
		}
	}

	static fromJson(json: any): UnidadeMedida {
		let unidadeMedida = new UnidadeMedida()
		unidadeMedida.idUnidadeMedida = json.id_unidade_medida
		unidadeMedida.descricao = json.descricao
		unidadeMedida.simbolo = json.simbolo
		return unidadeMedida
	}
}
