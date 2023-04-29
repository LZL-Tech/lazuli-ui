import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../core/model/compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

	private readonly url = 'http://localhost:5000/compra'

	findAll(): Observable<Compra[]> {
		return this.http.get<Compra[]>(this.url)
	}

	findById(idCompra: number): Observable<Compra> {
		return this.http.get<Compra>(`${this.url}/${idCompra}`)
	}

	save(compra: Compra) {
		return this.http.post(this.url, compra.toJson(), {headers: new HttpHeaders()})
	}
}
