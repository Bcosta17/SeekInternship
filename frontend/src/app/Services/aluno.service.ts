import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Aluno } from '../Interfaces/Aluno';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}alunos`;
  
  constructor(private http: HttpClient) { }

  createAluno(aluno: Aluno): Observable<Aluno> {
    const url = this.apiUrl + '/registro';
    return this.http.post<Aluno>(url, aluno);
  }

  verificaEmail(email: string) {
    return this.http.get(this.apiUrl)
    .pipe(
      map((dados: any) => dados.alunos),
      // tap(console.log),
      map((dados: {email: string}[]) => dados.filter(d => d.email === email)),
      // tap(console.log),
      map((dados: any[]) => dados.length > 0 ),
      // tap(console.log),      
    );
  }
  
  verificaCpf(cpf: string) {
    return this.http.get(this.apiUrl)
    .pipe(
      map((dados: any) => dados.alunos),
      //  tap(console.log),
      map((dados: {cpf: string}[]) => dados.filter(d => d.cpf === cpf)),
      //  tap(console.log),
      map((dados: any[]) => dados.length > 0 ),
      //  tap(console.log),    
    );
  }
}
