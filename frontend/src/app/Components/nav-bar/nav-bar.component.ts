import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from 'jwt-decode';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  token = localStorage.getItem('access_token')!
  decode:any = []

  faUser = faUser;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  
  islogado():boolean{
    if(this.token) {
      this.decode = jwt_decode(this.token);
      return true;
    }
    return false;
  }
  public logout(){
    this.loginService.logout();
  }
 

}
