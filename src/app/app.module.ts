import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from "primeng/menubar";
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { HomeComponent } from './home/home.component';
import { ProdutoModule } from './produto/produto.module';
import { PickListModule } from 'primeng/picklist';
import { CompraModule } from './compra/compra.module';

@NgModule({
  declarations: [
    AppComponent,
    BarraMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
		ProdutoModule,
		HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
