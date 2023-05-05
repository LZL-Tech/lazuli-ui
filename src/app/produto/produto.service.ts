import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Produto } from "../core/model/produto";

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
		return this.http.post(this.url, produto.toJson(), {observe: 'response'})
	}

	findByTipoProdutoAndDescricao(idTipoProduto: number, descricao: string): Observable<Produto[]> {
		return this.http.get<Produto[]>(
			`${this.url}/filter`,
			{
				params: {
					'id_tipo': idTipoProduto,
					'descricao': descricao
				}
			}
		)
	}
}
