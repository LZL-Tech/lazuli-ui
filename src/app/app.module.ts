import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { BarraMenuComponent } from './components/barra-menu/barra-menu.component';

import { ProdutoModule } from './pages/produto/produto.module';
import { HomeComponent } from './pages/home/home.component';
import { CompraModule } from './pages/compra/compra.module';
import { VendaModule } from './pages/venda/venda.module';


@NgModule({
	declarations: [
		AppComponent,
		BarraMenuComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MenubarModule,
		ProdutoModule,
		HttpClientModule,
		CompraModule,
		VendaModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
