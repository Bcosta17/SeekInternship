import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../Interfaces/Response';
@Injectable({
  providedIn: 'root'
})
export class RecuperacaoSenhaService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public forgotPassword(email:string): Observable<Response<any>>{
    const url = this.baseApiUrl+'recoveryPassword/forgotPassword'
    return this.http.post<Response<any>>(url,email).pipe(
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }
  
  public changePassword(dados: {tokenSenha: string; senha: string}): Observable<Response<any>>{
    const url = this.baseApiUrl+'recoveryPassword/resetPassword';
    return this.http.post<Response<any>>(url,dados).pipe(
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
