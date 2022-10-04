import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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
  
}

