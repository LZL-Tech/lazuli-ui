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
		return this.http.post(this.url, produto.toJson(), {observe: 'response'})
	}
}
