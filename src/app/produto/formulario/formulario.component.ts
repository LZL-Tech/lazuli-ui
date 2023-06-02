import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/core/model/produto';
import { TipoProduto } from 'src/app/core/model/tipo.produto';
import { UnidadeMedida } from 'src/app/core/model/unidade.medida';
import { TipoProdutoService } from 'src/app/produto/tipo-produto.service';
import { ProdutoService } from '../produto.service';
import { UnidadeMedidaService } from '../unidade-medida.service';
import { Message, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
	providers: [MessageService]
})
export class FormularioComponent implements OnInit, AfterContentChecked {

	produto = new Produto();
	tiposProduto: TipoProduto[] = new Array<TipoProduto>();
	unidadesMedida: UnidadeMedida[] = new Array<UnidadeMedida>();
	mensagens: Message[] = new Array<Message>();
	bloquerTela: boolean = false

  constructor(
		private produtoService: ProdutoService,
		private tipoProdutoService: TipoProdutoService,
		private unidadeMedidaService: UnidadeMedidaService,
		private activatedRoute: ActivatedRoute,
		private changeDetector: ChangeDetectorRef,
		private messageService: MessageService) { }

  ngOnInit(): void {
		this.bloquerTela = true
		let idProduto = this.activatedRoute.snapshot.paramMap.get('idProduto')
		let consultas: Promise<any>[] = [
			this.buscarTiposProduto(),
			this.buscarUnidadesMedida(),
		]

		Promise.all(consultas).then(responses => {
			this.tiposProduto = responses[0]
			this.unidadesMedida = responses[1]
			this.bloquerTela = false

			if (idProduto) {
				this.buscarProdutoPorId(parseInt(idProduto)).then(response => {this.produto = response})
			}
		})
  }

	ngAfterContentChecked(): void {
		this.changeDetector.detectChanges()
	}

	private async buscarProdutoPorId(idProduto: number): Promise<Produto> {
		let produto = await firstValueFrom(this.produtoService.findById(idProduto))
		return Produto.fromJson(produto);
	}

	private async buscarUnidadesMedida(): Promise<UnidadeMedida[]> {
		let unidades = await firstValueFrom(this.unidadeMedidaService.findAll())
		return unidades.map(unidade => UnidadeMedida.fromJson(unidade));
	}

	private async buscarTiposProduto(): Promise<TipoProduto[]> {
		let tipos: TipoProduto[] = new Array<TipoProduto>()
		let response = await firstValueFrom(this.tipoProdutoService.findAll())
		response.forEach(tipo => tipos.push(TipoProduto.fromJson(tipo)));
		return tipos
	}

	onSubmit(produtoForm: NgForm) {
		this.removerAtributosPorTipoProduto()
		if (this.produto.idProduto) {
			console.log('Editando produto')
			this.editarProduto(produtoForm);
		} else {
			console.log('Salvando produto')
			this.salvarProduto(produtoForm);
		}
	}

	private salvarProduto(produtoForm: NgForm) {
		this.produtoService.save(this.produto).subscribe(response => {
			if (response?.status === 201) {
				this.messageService.add({ severity: "success", summary: "Sucesso:", detail: "Produto salvo" });
				produtoForm.reset();
			}
		});
	}

	private editarProduto(produtoForm: NgForm) {
		this.produtoService.update(this.produto).subscribe(response => {
			if (response?.status === 200) {
				this.messageService.add({ severity: "success", summary: "Sucesso:", detail: "Produto editado" });
				produtoForm.reset();
			}
		});
	}

	private removerAtributosPorTipoProduto() {
		if (this.isProdutoIngrediente()) {
			this.produto.preco = undefined;
		} else {
			this.produto.marca = undefined;
		}
	}

	isProdutoIngrediente(): boolean {
		return this.produto.tipoProduto?.descricao?.toUpperCase() === 'INGREDIENTE';
	}

}
