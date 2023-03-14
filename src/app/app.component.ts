import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menus: MenuItem[] = [];

  ngOnInit() {
    this.menus = [
      {
        label: "Produto",
        icon: "fa fa-cookie-bite",
        items: [
          {label: "Cadastrar"},
          {label: "Lista"},
        ]
      },
      {
        label: "Receita",
        icon: "fa fa-kitchen-set",
        items: [
          {label: "Cadastrar"},
          {label: "Lista"},
        ]
      },
      {
        label: "Venda",
        icon: "fa fa-cart-shopping",
        items: [
          {label: "Registrar"},
          {label: "Lista"},
        ]
      },
      {
        label: "Compra",
        icon: "fa fa-shop",
        items: [
          {label: "Cadastrar"},
          {label: "Lista"},
        ]
      },
      {
        label: "Relatório",
        icon: "fa fa-chart-simple"
      }
    ]
  }
}
