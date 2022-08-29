import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaVagaComponent } from './shared/lista-vaga/lista-vaga.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { DetailsComponent } from './pages/details/details.component';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterAlunoComponent } from './shared/register-aluno/register-aluno.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaVagaComponent,
    NavBarComponent,
    DetailsComponent,
    RegisterLoginComponent,
    LoginComponent,
    RegisterAlunoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
