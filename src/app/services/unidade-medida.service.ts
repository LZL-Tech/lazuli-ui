import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadeMedida } from '../models/unidade.medida';

@Injectable({
  providedIn: 'root'
})
export class UnidadeMedidaService {

  private readonly url = `${environment.apiUrl}/unidade_medida`

  constructor(private http: HttpClient) { }

	findAll(): Observable<UnidadeMedida[]> {
		return this.http.get<UnidadeMedida[]>(this.url);
	}
}
