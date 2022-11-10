import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {
  private mensagens: string[] = ['teste','teste2'];
  
  constructor() { }

  add(mensagem: string): void{
    this.mensagens.push(mensagem);
  }

  clear(): void{
    this.mensagens = [];
  }

  getMessages(): string[]{
    return this.mensagens;
  }

}
