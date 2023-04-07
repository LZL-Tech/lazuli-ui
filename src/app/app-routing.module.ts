import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './produto/formulario/formulario.component';
import { ListaComponent } from './produto/lista/lista.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'produto/cadastrar', component: FormularioComponent},
	{path: 'produto/lista', component: ListaComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
