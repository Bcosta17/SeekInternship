import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';



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
