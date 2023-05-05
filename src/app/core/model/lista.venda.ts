export class ListaVenda {
    idVendaProduto?: number
	vendaProduto: ListaVenda[] = new Array<ListaVenda>()
	dataVenda?: Date

	toJson(): any {
		let listaVendaProduto = this.vendaProduto.map(produto => produto.toJson())
		return {
			dt_compra: this.dataVenda,
            venda_produto: listaVendaProduto
		}
	}
}
