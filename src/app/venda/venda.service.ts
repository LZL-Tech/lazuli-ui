import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaVenda } from '../core/model/lista.venda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private readonly url = 'http://localhost:5000/lista_venda'

  constructor(
    private http: HttpClient
  ) { }
  findAll(): Observable<ListaVenda[]> {
		return this.http.get<ListaVenda[]>(this.url);
	}
}
