import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  decode:any = [];
  
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  islogado():boolean{
    if(!this.loginService.logado()){ 
      return false;
    }
    this.decode = this.loginService.decode()
   
    return true;
  }
}
