import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './produto/formulario/formulario.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path: 'produto/cadastrar', component: FormularioComponent},
	{path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
