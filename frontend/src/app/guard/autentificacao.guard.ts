import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AutentificacaoGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(!this.loginService.logado()){
      this.router.navigate(['login']);
      return false;
    }
      return true;
  }
  
}
