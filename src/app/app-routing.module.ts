import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';
import { RegisterVacancyComponent } from './pages/register-vacancy/register-vacancy.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'login',
    component: RegisterLoginComponent
  },
  {
    path: 'registerVacancy',
    component: RegisterVacancyComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
