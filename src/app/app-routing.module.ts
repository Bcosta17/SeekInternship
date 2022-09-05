import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './Components/pages/details/details.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { RegisterLoginComponent } from './Components/pages/register-login/register-login.component';
import { RegisterAlunoComponent } from './Components/register/register-aluno/register-aluno.component';
import { RegisterEmpresaComponent } from './Components/register/register-empresa/register-empresa.component';
import { RegisterVacancyComponent } from './Components/register/register-vacancy/register-vacancy.component';

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
    path: 'register-login',
    component: RegisterLoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
