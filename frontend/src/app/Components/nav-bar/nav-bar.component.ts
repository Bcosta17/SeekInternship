import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/Services/login.service';
import { NotificacoesService } from 'src/app/Services/notificacoes.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  decode:any = [];

  faUser = faUser;
  
  constructor(private loginService: LoginService, public notificacao: NotificacoesService) { }

  ngOnInit(): void {
    
  }
  
  public isMenuCollapsed = true;
  
  islogado():boolean{
    if(!this.loginService.logado()){ 
      return false;
    }
    this.decode = this.loginService.decode()
   
    return true;
  }
  public logout(){
    this.loginService.logout();
  }
 

}
