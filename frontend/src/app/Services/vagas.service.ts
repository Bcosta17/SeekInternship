import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Vaga } from '../Interfaces/Vagas';
import { Response } from '../Interfaces/Response';


@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}vagas`;

  constructor(private http: HttpClient) { }

  getVagas(){
    return this.http.get<Response<Vaga[]>>(this.apiUrl);
  }
  getVaga(id: string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Vaga>>(url)
  }
  getVagasEmpresa(){
    const url = this.apiUrl + '/minhasvagas'
    return this.http.get<Response<Vaga[]>>(url)
    
  }
  
  getVagasAluno(){
    const url = this.apiUrl + '/minhascandidaturas'
    return this.http.get<Response<Vaga[]>>(url)
  }

  createVaga(vaga: Vaga): Observable<Vaga> {
    const url = this.apiUrl + '/cadastro';
    return this.http.post<Vaga>(url,vaga);
  }
  
  cadidatarVaga(id: string):Observable<any>{
    const url = this.apiUrl + '/candidatar/'+id;
    return this.http.post(url,id).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
        
  }

  deletarVaga(id: string):Observable<any>{
    const url = this.apiUrl + '/'+id;
    return this.http.delete(url).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
        
  }
}

