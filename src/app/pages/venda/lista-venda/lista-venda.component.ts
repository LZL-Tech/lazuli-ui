import { Component, OnInit } from '@angular/core';
import { saveAs } from "file-saver";
import * as xlsx from "xlsx";
import jsPDF from 'jspdf';
import * as auto from "jspdf-autotable";
import { VendaService } from 'src/app/services/venda.service';
import { Venda } from 'src/app/models/venda';

@Component({
	selector: 'app-lista-venda',
	templateUrl: './lista-venda.component.html',
	styleUrls: ['./lista-venda.component.css'],
})
export class ListaVendaComponent implements OnInit {

	vendas: Venda[] = new Array<Venda>()
	cols: any[] = []

	constructor(private vendaService: VendaService) { }

	ngOnInit(): void {
		this.vendaService.findAll().subscribe((response: Venda[]) => {
			this.vendas = response.map(venda => Venda.fromJson(venda))

			this.cols = [
				{header: '#', field: 'idVenda'},
				{header: 'Cliente', field: 'nomeCliente'},
				{header: 'Data', field: 'dataVenda'},
				{header: 'Qtd. Produtos', field: 'quantidadeTotalProdutos'},
				{header: 'Total', field: 'valorTotalVenda'},
			]
		})
	}

	exportarPDF(vendasFiltradas: Venda[]) {
		let pdf = new jsPDF()
		const vendasExportar = vendasFiltradas?? this.vendas;
		auto.default(pdf, {
			head: [['ID', 'Cliente', 'Data', 'Qtd. Produtos', 'Total']],
			body: vendasExportar.map(venda => {
				return [
					venda.idVenda? venda.idVenda.toString() : '',
					venda.nomeCliente? venda.nomeCliente.toString() : '',
					venda.dataVenda? venda.dataVenda.toLocaleDateString() : '',
					venda.quantidadeTotalProdutos? venda.quantidadeTotalProdutos.toString() : '',
					venda.valorTotalVenda? 'R$ '+venda.valorTotalVenda.toFixed(2): '',
				]
			})
		})
		pdf.save('vendas')
	}

	exportarExcel() {
		let vendasExcel = this.converterVendasParaExcel(this.vendas)
		const worksheet = xlsx.utils.json_to_sheet(vendasExcel);
		const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
		const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
		let data = new Blob([excelBuffer], {type: EXCEL_TYPE})
		saveAs(data, `vendas`)
	}


	private converterVendasParaExcel(vendas: Venda[]) {
		return vendas.map(venda => {
			return {
				"ID": venda.idVenda,
				"Cliente": venda.nomeCliente,
				"Data": venda.dataVenda,
				"Qtd. Produtos": venda.quantidadeTotalProdutos,
				"Total": venda.valorTotalVenda
			};
		});
	}
}
