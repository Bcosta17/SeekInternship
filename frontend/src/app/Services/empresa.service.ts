import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Empresa } from '../Interfaces/Empresa';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl =  `${this.baseApiUrl}empresas`;
  
  constructor(private http: HttpClient){ }
  
  createEmpresa(empresa: Empresa): Observable<Empresa>{
    const url = this.apiUrl + '/registro';
    return this.http.post<Empresa>(url, empresa);
  }

  verificaEmail(email: string) {
    return this.http.get(this.apiUrl)
    .pipe(
      map((dados: any) => dados.empresas),
      tap(console.log),
      map((dados: {email: string}[]) => dados.filter(d => d.email === email)),
      // tap(console.log),
      map((dados: any[]) => dados.length > 0 ),
      // tap(console.log),      
    )
  }

  verificaCnpj(cnpj: string) {
    return this.http.get(this.apiUrl)
    .pipe(
      map((dados: any) => dados.empresas),
      //  tap(console.log),
      map((dados: {cnpj: string}[]) => dados.filter(d => d.cnpj === cnpj)),
      //  tap(console.log),
      map((dados: any[]) => dados.length > 0 ),
      //  tap(console.log),    
    );
  }
}