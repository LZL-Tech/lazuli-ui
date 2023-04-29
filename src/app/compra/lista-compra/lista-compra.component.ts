import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css'],
})
export class ListaCompraComponent {
	listaCompra = [
    {
      idCompra: '',
      fornecedor: 'Atacadão',
      quantidadeProduto: 20,
      gastoProduto: 100.00
    },
    {
      idCompra: '',
      fornecedor: 'Assai',
			quantidadeProduto: 50,
      gastoProduto: 250.00
    },
    {
      idCompra: '',
      fornecedor: 'Sondas',
      quantidadeProduto: 70,
      gastoProduto: 600.00
    },

  ];

  constructor() {}

  ngOnInit(): void {}
}
