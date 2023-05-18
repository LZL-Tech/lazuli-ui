import { vendaProduto } from './venda.produto';

export class Venda {
	idVenda?: number;
	cliente?: string;
	dataVenda?: number;
	totalVenda?: number;

	toJson() {
		const vendaProdutoJson = {
			produto: {
				id_venda: this.idVenda?.idVenda,
				cliente: this.cliente?.cliente,
			},
			dataVenda: this.dataVenda,
			totalVenda: this.totalVenda,
		};
		return vendaProdutoJson;
	}

	static fromJson(json: any): vendaProduto {
		let produtoVendido = new vendaProduto();
		produtoVendido.idVenda = idVenda.fromJson(json);
		produtoVendido.cliente = json.cliente;
		produtoVendido.dataVenda = json.dataVenda;
		produtoVendido.totalVenda = json.vl_real;
		return Venda;
	}
}
