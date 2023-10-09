import { Component, OnInit } from '@angular/core';
import { saveAs } from "file-saver";
import * as xlsx from "xlsx";
import jsPDF from 'jspdf';
import * as auto from "jspdf-autotable";
import { VendaService } from 'src/app/services/venda.service';
import { Venda } from 'src/app/models/venda';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
	selector: 'app-lista-venda',
	templateUrl: './lista-venda.component.html',
	styleUrls: ['./lista-venda.component.css'],
	providers: [MessageService, ConfirmationService]
})
export class ListaVendaComponent implements OnInit {

	vendas: Venda[] = new Array<Venda>();

	mostrarDialogExcluir = false;
	isLoading: boolean = false;
	cols = [
		{header: '#', field: 'idVenda'},
		{header: 'Cliente', field: 'nomeCliente'},
		{header: 'Data', field: 'dataVenda'},
		{header: 'Qtd. Produtos', field: 'quantidadeTotalProdutos'},
		{header: 'Total', field: 'valorTotalVenda'},
	];

	constructor(
		private vendaService: VendaService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private router: Router) { }

	ngOnInit(): void {
		this.isLoading = true;

		try {
			this.getVendas().then((vendas) => {
				this.vendas = vendas;
				this.isLoading = false;
			})
		} catch (error) {
			this.messageService.add({severity:'error', summary: 'Ops!', detail: 'Ocorreu um erro ao consultar vendas'});
			console.error(error);
			this.isLoading = false;
		}
	}

	async getVendas(): Promise<Venda[]> {
		let vendaPromise = new Promise<Venda[]>((resolve, reject) => {
			this.vendaService.findAll().subscribe({
				next: (response) => {
					resolve(response.map(venda => Venda.fromJson(venda)))
				},
				error: (error) => {
					reject(error)
				}
			});
		});
		return vendaPromise;
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

	editar(idVenda: number) {
		this.router.navigate(['/venda', idVenda]);
	}

	confirmDialogExcluir(idVenda: number): void {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir a venda?',
			accept: () => {
				this.isLoading = true;
				this.excluir(idVenda).then(() => {
					this.getVendas().then(() => {
						this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda excluída' });
						this.getVendas().then((vendas) => {
							this.vendas = vendas;
							this.isLoading = false;
						})
					})
				}
				).catch((error) => {
					console.error(error);
					this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Ocorreu um erro ao excluir a venda' });
					this.isLoading = false;
				});
			}
		});
	}

	private excluir(idVenda: number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.vendaService.delete(idVenda).subscribe({
				next: () => {
					resolve();
				},
				error: (error) => {
					reject(error);
				}
			});
		});
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
