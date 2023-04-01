import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadeMedida } from '../core/model/unidade.medida';

@Injectable({
  providedIn: 'root'
})
export class UnidadeMedidaService {

	private readonly url = 'http://localhost:5000/unidade_medida'

  constructor(private http: HttpClient) { }

	findAll(): Observable<UnidadeMedida[]> {
		return this.http.get<UnidadeMedida[]>(this.url);
	}
}
