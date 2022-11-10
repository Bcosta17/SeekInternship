import { Component, OnInit } from '@angular/core';
import { NotificacoesService } from 'src/app/Services/notificacoes.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent{
  show = true;
  constructor(public notificacao: NotificacoesService) { }
  
}
