import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../core/model/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {


constructor(
  private http: HttpClient
  ) { }

private readonly url = 'http://localhost:5000/venda'

findAll(): Observable<Venda[]> {
  return this.http.get<Venda[]>(this.url)
}

findById(idVenda: number): Observable<Venda> {
  return this.http.get<Venda>(`${this.url}/${idVenda}`)
}

save(venda: Venda) {
  return this.http.post(this.url, venda.toJson())
}
}

