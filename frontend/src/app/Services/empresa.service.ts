import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Response } from '../Interfaces/Response';
import { Empresa } from '../Interfaces/Empresa';
import { Email } from '../Interfaces/Email';


@Injectable({
  providedIn: 'root'
})

export class EmpresaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl =  `${this.baseApiUrl}empresas`;
  
  constructor(private http: HttpClient){ }
  


  createEmpresa(empresa: Empresa): Observable<Empresa>{
    const url = this.apiUrl + '/registro';
    return this.http.post<Empresa>(url, empresa).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  getEmpresa(id: string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Empresa>>(url).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  editarEmpresa(id:string, empresa: Empresa){
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Empresa>(url,empresa).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  enviarEmail(email: Email){
    const url = `${this.apiUrl}/enviarEmail`;
    return this.http.post(url,email).pipe(
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
    return this.http.get(this.apiUrl)
    .pipe(
      map((dados: any) => dados.data),
      // tap(console.log),
      map((dados: {email: string}[]) => dados.filter(d => d.email === email)),
      // tap(console.log),
      map((dados: any[]) => dados.length > 0 ),
      // tap(console.log),      
    )
  }

  verificaCnpj(cnpj: string) {
    return this.http.get(this.apiUrl)
    .pipe(
      map((dados: any) => dados.data),
      //  tap(console.log),
      map((dados: {cnpj: string}[]) => dados.filter(d => d.cnpj === cnpj)),
      //  tap(console.log),
      map((dados: any[]) => dados.length > 0 ),
      //  tap(console.log),    
    );
  }
}