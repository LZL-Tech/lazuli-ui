import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Venda } from "../core/model/venda";


	@Injectable({
		providedIn: 'root'
	})
	export class VendaService {

		private readonly url = 'http://localhost:5000/venda'

		constructor(private http: HttpClient) { }

		findAll(): Observable<Venda[]> {
			return this.http.get<Venda[]>(this.url);
