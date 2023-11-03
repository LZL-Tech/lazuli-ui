import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  private readonly url = `${environment.apiUrl}/compra`

	findAll(): Observable<Compra[]> {
		return this.http.get<Compra[]>(this.url)
	}

	findById(idCompra: number): Observable<Compra> {
		return this.http.get<Compra>(`${this.url}/${idCompra}`)
	}

	save(compra: Compra) {
		return this.http.post(this.url, compra.toJson())
	}

	delete(idCompra: number): Observable<any> {
		return this.http.delete(`${this.url}/${idCompra}`)
	}
}
