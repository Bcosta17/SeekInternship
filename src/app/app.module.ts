import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { ListaVagaComponent } from './Components/lista-vaga/lista-vaga.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { DetailsComponent } from './Components/pages/details/details.component';
import { RegisterLoginComponent } from './Components/pages/register-login/register-login.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { RegisterAlunoComponent } from './Components/register/register-aluno/register-aluno.component';
import { RegisterEmpresaComponent } from './Components/register/register-empresa/register-empresa.component';
import { RegisterVacancyComponent } from './Components/register/register-vacancy/register-vacancy.component';
import { PerfilComponent } from './Components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaVagaComponent,
    NavBarComponent,
    DetailsComponent,
    RegisterLoginComponent,
    LoginComponent,
    RegisterAlunoComponent,
    RegisterEmpresaComponent,
    RegisterVacancyComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
