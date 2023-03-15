import { Component, OnInit } from '@angular/core';

import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent implements OnInit {

  constructor() { }

  menus: MenuItem[] = [];

  ngOnInit(): void {
    this.menus = [
      {
        label: "Produto",
        icon: "fa fa-cookie-bite",
        items: [
          { label: "Cadastrar", routerLink: 'produto/cadastrar' },
          { label: "Lista" },
        ]
      },
      {
        label: "Receita",
        icon: "fa fa-kitchen-set",
        items: [
          { label: "Cadastrar" },
          { label: "Lista" },
        ]
      },
      {
        label: "Venda",
        icon: "fa fa-cart-shopping",
        items: [
          { label: "Registrar" },
          { label: "Lista" },
        ]
      },
      {
        label: "Compra",
        icon: "fa fa-shop",
        items: [
          { label: "Cadastrar" },
          { label: "Lista" },
        ]
      },
      {
        label: "Relatório",
        icon: "fa fa-chart-simple"
      }
    ]
  }

}
