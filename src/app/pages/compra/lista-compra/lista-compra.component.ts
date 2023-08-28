import { Component } from '@angular/core';
import { jsPDF } from "jspdf";
import * as auto from "jspdf-autotable";
import * as xlsx from "xlsx";
import { saveAs } from "file-saver";
import { CompraService } from 'src/app/services/compra.service';
import { Compra } from 'src/app/models/compra';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css'],
})
export class ListaCompraComponent {

	compras: Compra[] = [];
	cols: any[] = [
		{header: '#', field: 'idCompra'},
		{header: 'Fornecedor', field: 'fornecedor'},
		{header: 'Quantidade', field: 'quantidadeTotalProdutos'},
		{header: 'Gasto', field: 'totalGasto'},
		{header: 'Data', field: 'dataCompra'}
	]

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
		this.compraService.findAll()
			.subscribe(compras => {
				this.compras = compras.map(compra => Compra.fromJson(compra))
			})
	}

	exportarPDF(comprasFiltradas: any) {
		let pdf = new jsPDF()
		const comprasExportar: Compra[] = comprasFiltradas?? this.compras;
		auto.default(pdf, {
			head: [['ID', 'Fornecedor', 'Data', 'Qtd. Produtos', 'Total']],
			body: comprasExportar.map(compra => {
				return [
					compra.idCompra? compra.idCompra.toString() : '',
					compra.fornecedor? compra.fornecedor.toString() : '',
					compra.dataCompra? compra.dataCompra.toLocaleDateString() : '',
					compra.quantidadeTotalProdutos? compra.quantidadeTotalProdutos.toString() : '',
					compra.totalGasto? 'R$ '+compra.totalGasto.toFixed(2): '',
				]
			})
		})
		pdf.save('compras')
	}

	exportarExcel() {
		let comprasExcel = this.converterComprasParaExcel(this.compras)
		const worksheet = xlsx.utils.json_to_sheet(comprasExcel);
		const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
		const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
		let data = new Blob([excelBuffer], {type: EXCEL_TYPE})
		saveAs(data, `compras`)
	}


	private converterComprasParaExcel(compras: Compra[]) {
		return compras.map(compra => {
			return {
				"ID": compra.idCompra,
				"Fornecedor": compra.fornecedor,
				"Data": compra.dataCompra,
				"Qtd. Produtos": compra.quantidadeTotalProdutos,
				"Total": compra.totalGasto
			};
		});
	}
}
