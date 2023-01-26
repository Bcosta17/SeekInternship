import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule} from 'ngx-mask'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { ListaVagaComponent } from './Components/lista-vaga/lista-vaga.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { DetailsComponent } from './Components/pages/details/details.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewEmpresaComponent } from './Components/pages/new-empresa/new-empresa.component';
import { EmpresaFormComponent } from './Components/forms/empresa-form/empresa-form.component';
import { AlunoFormComponent } from './Components/forms/aluno-form/aluno-form.component';
import { VagaFormComponent } from './Components/forms/vaga-form/vaga-form.component';
import { RegistroComponent } from './Components/pages/registro/registro.component';
import { NewAlunoComponent } from './Components/pages/new-aluno/new-aluno.component';
import { NewVagaComponent } from './Components/pages/new-vaga/new-vaga.component';
import { AuthTokenInterceptor } from './Interceptor/auth-token.interceptor';
import { AutentificacaoGuard } from './guard/autentificacao.guard';
import { EmpresaComponent } from './Components/pages/empresa/empresa.component';
import { AlunoCandidaturasComponent } from './Components/pages/aluno-candidaturas/aluno-candidaturas.component';
import { EditVagaComponent } from './Components/pages/edit/edit-vaga/edit-vaga.component';
import { NotificacoesComponent } from './Components/pages/notificacoes/notificacoes.component';
import { EditEmpresaComponent } from './Components/pages/edit/edit-empresa/edit-empresa.component';
import { EditAlunoComponent } from './Components/pages/edit/edit-aluno/edit-aluno.component';
import { Pagina404Component } from './Components/pages/pagina404/pagina404.component';
import { RecuperacaoSenhaComponent } from './Components/pages/recuperacao-senha/recuperacao-senha.component';
import { MudarSenhaComponent } from './Components/pages/mudar-senha/mudar-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaVagaComponent,
    NavBarComponent,
    DetailsComponent,
    LoginComponent,
    PerfilComponent,
    NewEmpresaComponent,
    EmpresaFormComponent,
    AlunoFormComponent,
    VagaFormComponent,
    RegistroComponent,
    NewAlunoComponent,
    NewVagaComponent,
    EmpresaComponent,
    AlunoCandidaturasComponent,
    EditVagaComponent,
    NotificacoesComponent,
    EditEmpresaComponent,
    EditAlunoComponent,
    Pagina404Component,
    RecuperacaoSenhaComponent,
    MudarSenhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
     AutentificacaoGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
