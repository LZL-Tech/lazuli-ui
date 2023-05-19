import { VendaProduto } from "./venda.produto";

export class Venda {
	idVenda?: number;
	cliente?: string;
	vendaProdutos?: VendaProduto[];
	dataVenda?: number;
	totalVenda?: number;

	toJson() {
		const vendaJson = {
			id_venda: this.idVenda,
			cliente: this.cliente,
			data_venda: this.dataVenda,
			total_venda: this.totalVenda,
		};
		return vendaJson;
	}

	static fromJson(json: any): Venda {
		let venda = new Venda();
		venda.idVenda = json.id_venda;
		venda.cliente = json.cliente;
		venda.dataVenda = json.data_venda;
		venda.totalVenda = json.vl_total;
		return venda;
	}

}



