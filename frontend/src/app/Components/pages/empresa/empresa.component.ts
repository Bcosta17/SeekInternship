import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faAdd, faEdit, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Aluno } from 'src/app/Interfaces/Aluno';

import { Vaga } from 'src/app/Interfaces/Vagas';

import { VagasService } from 'src/app/Services/vagas.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  vagas: Vaga[] = [];
  
  alunos: Aluno[] = [];

  faTimes = faTimes;
  faEdit = faEdit;
  faAdd = faAdd;
  faEye = faEye;

  constructor(
    private vagaService: VagasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vagaService.getVagasEmpresa().subscribe( (vagas)=>{
      const data = vagas.data;

      data.map((vaga: { createdAt: string | number | Date; }) => {
        vaga.createdAt = new Date(vaga.createdAt!).toLocaleDateString(
          'pt-BR'
        );
      });
      this.vagas=data;
    }

    )
  }

  deletarVaga(id: string) {
    this.vagaService.deletarVaga(id).subscribe();
  }
  candidatos(id:number){
    this.alunos = this.vagas[id].alunos
  }
}
