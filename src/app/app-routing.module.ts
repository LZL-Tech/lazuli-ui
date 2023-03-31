import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './produto/formulario/formulario.component';
import { ListaComponent } from './produto/lista/lista.component';


const routes: Routes = [
	{path: 'produto/cadastrar', component: FormularioComponent},
	{path: 'produto/lista', component: ListaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
