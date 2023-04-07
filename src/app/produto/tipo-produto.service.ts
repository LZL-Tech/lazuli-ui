import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoProduto } from '../core/model/tipo.produto';

@Injectable({
  providedIn: 'root'
})
export class TipoProdutoService {

	private readonly url = 'http://localhost:5000/tipo_produto'

  constructor(private http: HttpClient) { }

	findAll(): Observable<TipoProduto[]> {
		return this.http.get<TipoProduto[]>(this.url);
	}
}
