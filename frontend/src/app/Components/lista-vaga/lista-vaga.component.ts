import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { VagasService } from 'src/app/Services/vagas.service';
@Component({
  selector: 'app-lista-vaga',
  templateUrl: './lista-vaga.component.html',
  styleUrls: ['./lista-vaga.component.css']
})
export class ListaVagaComponent implements OnInit {

  vagas: Vaga[] = [];

  faCalendar = faCalendar;

  constructor(private vagasService : VagasService) { }
  
  ngOnInit() {
   this.vagasService.getVagas().subscribe((dados)=> {
    const data = dados.data;
    data.map((item) => {
      item.createdAt = new Date(item.createdAt!).toLocaleDateString(
        'pt-BR'
      );
    });
    this.vagas = data;
   });
  }
}
