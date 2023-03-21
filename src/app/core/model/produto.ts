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
}
