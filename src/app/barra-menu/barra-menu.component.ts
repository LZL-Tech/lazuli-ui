import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-barra-menu',
	templateUrl: './barra-menu.component.html',
	styleUrls: ['./barra-menu.component.css'],
})
export class BarraMenuComponent implements OnInit {
	constructor() {}

	menus: MenuItem[] = [];

  ngOnInit(): void {
    this.menus = [
      {
        label: "Produto",
        icon: "fa fa-cookie-bite",
        items: [
          { label: "Cadastrar", routerLink: 'produto/cadastrar' },
          { label: "Lista", routerLink: 'produto/listar' },
        ]
      },
      {
        label: "Venda",
        icon: "fa fa-cart-shopping",
        items: [
          { label: "Registrar", routerLink: 'venda/registrar'},
          { label: "Lista", routerLink: 'venda/listar' },
        ]
      },
      {
        label: "Compra",
        icon: "fa fa-shop",
        items: [
          { label: "Cadastrar", routerLink: 'compra/cadastrar' },
          { label: "Lista", routerLink: 'compra/listar' },
        ]
      },
      {
        label: "Relatório",
        icon: "fa fa-chart-simple"
      }
    ]
  }

}
