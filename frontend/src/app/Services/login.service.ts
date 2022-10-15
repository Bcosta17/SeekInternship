import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseApiUrl = environment.baseApiUrl;
  private token:any = '';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  public login(payload: { email: string; senha: string }): Observable<any> {
    return this.http
      .post<{ token: string }>(this.baseApiUrl + 'login', payload)
      .pipe(
        map((data) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', data.token);
          const decode:any = jwt_decode(localStorage.getItem('access_token')!);
          
          if (decode.role === 1) return this.router.navigate(['empresa']) 
          return this.router.navigate(['']);
        }),
        catchError((err) => {
          if (err.error.message) return throwError(() => err.error.message);
 
          return throwError(
            () =>
              'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
          );
        })
      );
  }

  public logout(){
    localStorage.removeItem('access_token');
    return this.router.navigate(['login']);
  }

  public logado(): boolean{
    this.token = localStorage.getItem('access_token');
    
    if (!this.token) return false;

    return !this.jwtHelper.isTokenExpired(this.token);
  }

  public decode(){
    if (this.logado())
      return this.jwtHelper.decodeToken(this.token);
  }

}
