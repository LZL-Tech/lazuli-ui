import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-venda',
  templateUrl: './lista-venda.component.html',
  styleUrls: ['./lista-venda.component.css']
})
export class ListaVendaComponent implements OnInit {

	listaVenda = [
    {
      idVendaProduto: '',
      vendaProduto: 'Bolo',
      dataVenda: '05/05/2023',
    },
    {
      idVendaProduto: '',
      vendaProduto: 'Torta',
      dataVenda: '05/05/2023',
    },

  ];


  constructor() { }

  ngOnInit() {
  }

}
