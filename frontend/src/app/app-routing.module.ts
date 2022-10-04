import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './Components/pages/details/details.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { NewAlunoComponent } from './Components/pages/new-aluno/new-aluno.component';
import { NewEmpresaComponent } from './Components/pages/new-empresa/new-empresa.component';
import { RegistroComponent } from './Components/pages/registro/registro.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'vaga/detalhes',
    component: DetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'registro_empresa',
    component: NewEmpresaComponent
  },
  {
    path: 'registro_aluno',
    component: NewAlunoComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
