import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/Interfaces/Empresa';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { VagasService } from 'src/app/Services/vagas.service';

@Component({
  selector: 'app-aluno-candidaturas',
  templateUrl: './aluno-candidaturas.component.html',
  styleUrls: ['./aluno-candidaturas.component.css']
})
export class AlunoCandidaturasComponent implements OnInit {
  
  vagas: Vaga[] = [];

  empresa!: Empresa; 

  faTimes = faTimes;

  constructor(
    private vagaService: VagasService,
  ) { }

  ngOnInit(): void {
    this.vagaService.getVagasAluno().subscribe( (vagas)=>{
      this.vagas = vagas.data;
      console.log(this.vagas[1].empresa);
    })
  }
  
}
