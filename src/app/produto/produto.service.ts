import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produto} from "../core/model/produto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

	private readonly url = 'http://localhost:5000/produto';

	findAll(): Observable<Produto[]> {
		return this.http.get<Produto[]>(this.url)
	}

	findById(idProduto: number): Observable<Produto> {
		return this.http.get<Produto>(`${this.url}/${idProduto}`)
	}

	save(produto: Produto): Observable<any> {
		let produtoJson = {
			descricao: produto.descricao,
			marca: produto.marca,
			qtd_estoque: produto.quantidadeEstoque,
			preco: produto.preco,
			tipo_produto: {
				descricao: produto.tipoProduto?.descricao,
				id_tipo_peoduto: produto.tipoProduto?.idTipoProduto
			},
			unidade_medida: {
				id_unidade_medida: produto.unidadeMedida?.idUnidadeMedida,
				descricao: produto.unidadeMedida?.descricao,
				simbolo: produto.unidadeMedida?.simbolo
			}
		}
		return this.http.post(this.url, produtoJson)
	}
}
