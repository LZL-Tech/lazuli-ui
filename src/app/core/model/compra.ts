import { CompraProduto } from './compra.produto'

export class Compra {
	idCompra?: number
	fornecedor?: string
	produtos?: CompraProduto[]
	dataCompra?: Date
}
