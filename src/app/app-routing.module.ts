import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent as ProdutoFormComponent } from './produto/formulario/formulario.component';
import { ListaComponent as ProdutoListComponent } from './produto/lista/lista.component';
import { FormularioComponent as CompraFormComponent } from './compra/formulario/formulario.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'produto/cadastrar', component: ProdutoFormComponent},
	{path: 'produto/listar', component: ProdutoListComponent},
	{path: 'compra/cadastrar', component: CompraFormComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
