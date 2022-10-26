import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JsonDadosService {

  constructor(private http: HttpClient) { }

  getArea(){
    return this.http.get<any>('assets/dados/areas.json');
  }
  getCursos(){
    return this.http.get<any>('assets/dados/cursos.json');
  }
}
