import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent as ProdutoFormComponent } from './pages/produto/formulario/formulario.component';
import { ListaComponent as ProdutoListComponent } from './pages/produto/lista/lista.component';
import { FormularioComponent as CompraFormComponent } from './pages/compra/formulario/formulario.component';

import { ListaCompraComponent } from './pages/compra/lista-compra/lista-compra.component';
import { ListaVendaComponent } from './pages/venda/lista-venda/lista-venda.component';
import { FormularioComponent } from './pages/venda/formulario/formulario.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'produto/cadastrar', component: ProdutoFormComponent },
	{ path: 'produto/atualizar/:id', component: ProdutoFormComponent },
	{ path: 'produto/listar', component: ProdutoListComponent },
	{ path: 'compra/cadastrar', component: CompraFormComponent },
	{ path: 'compra/listar', component: ListaCompraComponent },
	{ path: 'compra/:id', component: CompraFormComponent },
	{ path: 'venda/registrar', component: FormularioComponent },
	{ path: 'venda/listar', component: ListaVendaComponent },
	{ path: 'venda/:id', component: FormularioComponent },
]


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]

})
export class AppRoutingModule { }
