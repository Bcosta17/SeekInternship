import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor { //adicionar o token no header de toda requesição

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestUrl = request.url.split('/')[2];
    const baseApiUrl = environment.baseApiUrl.split('/')[2];
    const token = localStorage.getItem('access_token');

    if(token && requestUrl === baseApiUrl) { // verificar se a requisição é pra url do backend e não para outra API externa
      const newResquest = request.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
      return next.handle(newResquest);
    }
    return next.handle(request);
  }
}
