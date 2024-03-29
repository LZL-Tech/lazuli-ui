import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import * as auto from "jspdf-autotable";

import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Compra } from 'src/app/models/compra';

import { CompraService } from 'src/app/services/compra.service';

import * as xlsx from "xlsx";

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css'],
	providers: [MessageService, ConfirmationService],
})
export class ListaCompraComponent {

	compras: Compra[] = [];

	isLoading: boolean = false;
	cols: any[] = [
		{header: '#', field: 'idCompra'},
		{header: 'Fornecedor', field: 'fornecedor'},
		{header: 'Quantidade', field: 'quantidadeTotalProdutos'},
		{header: 'Gasto', field: 'totalGasto'},
		{header: 'Data', field: 'dataCompra'}
	]

  constructor(
		private compraService: CompraService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private router: Router) {}

  ngOnInit(): void {
		this.isLoading = true;

		this.getCompras().then((compras) => {
			this.compras = compras;
			this.isLoading = false;
		}).catch((error) => {
			this.messageService.add({severity:'error', summary: 'Ops!', detail: 'Ocorreu um erro ao consultar compras'});
			console.error(error);
			this.isLoading = false;
		});
	}

	async getCompras(): Promise<Compra[]> {
		let compraPromise = new Promise<Compra[]>((resolve, reject) => {
			this.compraService.findAll().subscribe({
				next: (response) => {
					resolve(response.map(compra => Compra.fromJson(compra)))
				},
				error: (error) => {
					reject(error)
				}
			});
		});
		return compraPromise;
	}

	excluir(idCompra: number) {
		return new Promise<any>((resolve, reject) => {
			this.compraService.delete(idCompra).subscribe({
				next: (response) => {
					resolve(response);
				},
				error: (error) => {
					reject(error);
				}
			});
		});
	}

	editar(idCompra: number) {
		this.router.navigate(['/compra', idCompra]);
	}

	confirmDialogExcluir(idCompra: number): void {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir a compra?',
			accept: () => {
				this.isLoading = true;
				this.excluir(idCompra).then(() => {
					this.getCompras().then(() => {
						this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Compra excluída' });
						this.getCompras().then((vendas) => {
							this.compras = vendas;
							this.isLoading = false;
						})
					})
				}
				).catch((error) => {
					console.error(error);
					this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Ocorreu um erro ao excluir a compra' });
					this.isLoading = false;
				});
			}
		});
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
