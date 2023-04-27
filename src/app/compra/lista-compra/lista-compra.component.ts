import { Component, OnInit } from '@angular/core';
import { IdCompra } from 'src/app/core/model/id.compra';
import { Fornecedor } from 'src/app/core/model/fornecedor';
import { QuantidadeProduto } from 'src/app/core/model/quantidade.produto';
import { GastoProduto } from 'src/app/core/model/gasto.produto';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css'],
})
export class Lista_compraComponent {
	listaCompra = [
    {
      IdCompra: '',
      fornecedor: 'Atacadão',
      quantidadeProduto: 20,
      GastoProduto: 100,00,
    },
    {
      IdCompra: '',
      fornecedor: 'Assai',
			quantidadeProduto: 50,
      GastoProduto: 250,00,
    },
    {
      IdCompra: '',
      fornecedor: 'Sondas',
      quantidadeProduto: 70,
      GastoProduto: 600,00,
    },

  ];

  constructor() {}

  ngOnInit(): void {}
}
