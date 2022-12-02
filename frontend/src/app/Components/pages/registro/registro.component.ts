import { Component, OnInit } from '@angular/core';
import { faBuilding, faBuildingLock, faBuildingNgo, faBuildingShield, faBuildingUser, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }
  faUser = faUser;
  faBuilding = faBuilding;
  
  ngOnInit(): void {
  }

}
