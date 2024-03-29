import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Produto } from "../models/produto";


@Injectable({
	providedIn: 'root'
})
export class ProdutoService {

	constructor(private http: HttpClient) { }

	private readonly url = `${environment.apiUrl}/produto`

	findAll(): Observable<Produto[]> {
		return this.http.get<Produto[]>(this.url)
	}

	findById(idProduto: number): Observable<Produto> {
		return this.http.get<Produto>(`${this.url}/${idProduto}`)
	}

	save(produto: Produto): Observable<any> {
		return this.http.post(this.url, produto, {observe: 'response'})
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

	update(id: number, produto: Produto): Observable<any> {
		return this.http.put(`${this.url}/${id}`, produto.toJson(), { observe: 'response' })
	}

	delete(id: number): Observable<any> {
	  return this.http.delete(`${this.url}/${id}`);
	}
}
