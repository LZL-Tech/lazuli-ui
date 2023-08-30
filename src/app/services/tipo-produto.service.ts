import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoProduto } from '../models/tipo.produto';

@Injectable({
  providedIn: 'root'
})
export class TipoProdutoService {

  private readonly url = `${environment.apiUrl}/tipo_produto`
  
  constructor(private http: HttpClient) { }

	findAll(): Observable<TipoProduto[]> {
		return this.http.get<TipoProduto[]>(this.url);
	}
}
