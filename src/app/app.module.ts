import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarModule } from "primeng/menubar";
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { ProdutoModule } from './produto/produto.module';

@NgModule({
  declarations: [
    AppComponent,
    BarraMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
		ProdutoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
