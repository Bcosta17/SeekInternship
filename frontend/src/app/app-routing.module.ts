import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutentificacaoGuard } from './guard/autentificacao.guard';

import { DetailsComponent } from './Components/pages/details/details.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { NewAlunoComponent } from './Components/pages/new-aluno/new-aluno.component';
import { NewEmpresaComponent } from './Components/pages/new-empresa/new-empresa.component';
import { RegistroComponent } from './Components/pages/registro/registro.component';
import { NewVagaComponent } from './Components/pages/new-vaga/new-vaga.component';
import { EmpresaComponent } from './Components/pages/empresa/empresa.component';
import { AlunoCandidaturasComponent } from './Components/pages/aluno-candidaturas/aluno-candidaturas.component';
import { EditVagaComponent } from './Components/pages/edit/edit-vaga/edit-vaga.component';
import { NotificacoesComponent } from './Components/pages/notificacoes/notificacoes.component';
import { EditAlunoComponent } from './Components/pages/edit/edit-aluno/edit-aluno.component';
import { EditEmpresaComponent } from './Components/pages/edit/edit-empresa/edit-empresa.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'vaga/:id',
    canActivate: [AutentificacaoGuard],
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
  {
    path: 'registro_vaga',
    canActivate: [AutentificacaoGuard],
    component: NewVagaComponent
  },
  
  {
    path: 'empresa',
    canActivate: [AutentificacaoGuard],
    component: EmpresaComponent
  },
  {
    path: 'empresa/editar/vaga/:id',
    canActivate: [AutentificacaoGuard],
    component: EditVagaComponent
  },
  {
    path: 'minhas_Candidaturas',
    canActivate: [AutentificacaoGuard],
    component: AlunoCandidaturasComponent
  },
  {
    path: 'notificacao',
    canActivate: [AutentificacaoGuard],
    component: NotificacoesComponent
    
  },
  {
    path:'aluno/editar/:id',
    canActivate: [AutentificacaoGuard],
    component: EditAlunoComponent
  },
  {
    path:'empresa/editar/:id',
    canActivate: [AutentificacaoGuard],
    component: EditEmpresaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
