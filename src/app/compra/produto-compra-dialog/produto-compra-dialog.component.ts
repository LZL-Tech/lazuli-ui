import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'src/app/core/model/produto';

@Component({
  selector: 'app-produto-compra-dialog',
  templateUrl: './produto-compra-dialog.component.html',
  styleUrls: ['./produto-compra-dialog.component.css']
})
export class ProdutoCompraDialogComponent implements OnInit {

	@Input()
	visivel?: boolean

	produto?: Produto

  constructor() { }

  ngOnInit(): void {
  }

}
