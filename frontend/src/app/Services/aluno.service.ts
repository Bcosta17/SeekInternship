import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, observable, Observable, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Response } from '../Interfaces/Response';
import { Aluno } from '../Interfaces/Aluno';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}alunos`;

  constructor(private http: HttpClient) {}

  createAluno(aluno: Aluno): Observable<Aluno> {
    const url = this.apiUrl + '/registro';
    return this.http.post<Aluno>(url, aluno).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  getAluno(id: string){
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Response<Aluno>>(url).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  editarAluno(id:string,aluno:Aluno): Observable<Aluno>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Aluno>(url, aluno).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  verificaEmail(email: string) {
    return this.http.get<Response<Aluno[]>>(this.apiUrl).pipe(
      map((dados: any) => dados.data),
      // tap(console.log),
      map((dados: { email: string }[]) =>
        dados.filter((d) => d.email === email)
      ),
      // tap(console.log),
      map((dados: any[]) => dados.length > 0)
      // tap(console.log),
    );
  }

  verificaCpf(cpf: string) {
    return this.http.get<Response<Aluno[]>>(this.apiUrl).pipe(
      map((dados: any) => dados.data),
      //  tap(console.log),
      map((dados: { cpf: string }[]) => dados.filter((d) => d.cpf === cpf)),
      //  tap(console.log),
      map((dados: any[]) => dados.length > 0)
      //  tap(console.log),
    );
  }
 
  comparaAlunoVaga() {
    return this.http.get<Response<Aluno[]>>(this.apiUrl)
  }
 
  
}

