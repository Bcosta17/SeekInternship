import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faAdd, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Vaga } from 'src/app/Interfaces/Vagas';

import { VagasService } from 'src/app/Services/vagas.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  
  vagas: Vaga[] = [];
  
  faTimes = faTimes;
  faEdit = faEdit;
  faPlus = faAdd;
  
  constructor(
    private vagaService: VagasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.vagaService.getVagasEmpresa().subscribe((v) => {
      this.vagas = v.vagas;
      this.vagas.map((item) => {
        item.createdAt = new Date(item.createdAt!).toLocaleDateString(
          'pt-BR'
        );
      });
    })
  }

}
