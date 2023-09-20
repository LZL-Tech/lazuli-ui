import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venda } from '../models/venda';

@Injectable({
	providedIn: 'root'
})
export class VendaService {

	constructor(private http: HttpClient) { }

	private readonly url = `${environment.apiUrl}/venda`

	findAll(): Observable<Venda[]> {
		return this.http.get<Venda[]>(this.url)
	}

	findById(idVenda: number): Observable<Venda> {
		return this.http.get<Venda>(`${this.url}/${idVenda}`)
	}

	save(venda: Venda) {
		return this.http.post(this.url, venda.toJson())
	}

	update(venda: Venda): Observable<any> {
		return this.http.put(`${this.url}/${venda.idVenda}`, venda.toJson());
	}
}
