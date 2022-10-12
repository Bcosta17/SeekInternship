import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
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
    return this.http.get<Response<Vaga>>(url).pipe(
      tap(console.log)
    );
  }
  
  createVaga(vaga: Vaga): Observable<Vaga> {
    const url = this.apiUrl + '/cadastro';
    console.log(vaga);
    return this.http.post<Vaga>(url,vaga);
  }
  
}

