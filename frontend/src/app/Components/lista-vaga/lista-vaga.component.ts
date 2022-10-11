import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { VagasService } from 'src/app/Services/vagas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-vaga',
  templateUrl: './lista-vaga.component.html',
  styleUrls: ['./lista-vaga.component.css']
})
export class ListaVagaComponent implements OnInit {
  
  baseApiUrl = environment.baseApiUrl
  
  allVagas: Vaga[] = [];
  vagas: Vaga[] = [];

  allVagas$: Observable<Vaga[]> = new Observable();

  constructor(private vagasService : VagasService) { }
  
  ngOnInit() {
   this.vagasService.getVagas().subscribe((dados)=> {
    const data = dados.data;
    data.map((item) => {
      item.createdAt = new Date(item.createdAt!).toLocaleDateString(
        'pt-BR'
      );
    });
    
    this.allVagas = data;
    this.vagas = data;
   });
   
  }

}
