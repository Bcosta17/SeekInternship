import { Component, OnInit, ViewChild } from '@angular/core';


import { faAdd, faEdit, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  vagaSelecionada!: string;
  alunos: Aluno[] = [];
  
  faTimes = faTimes;
  faEdit = faEdit;
  faAdd = faAdd;
  faEye = faEye;

  @ViewChild('modeldelete') modeldelete: any; 
 
  constructor(
    private vagaService: VagasService,
    private modalService: NgbModal,
    
  ) { }
    
  ngOnInit(): void {
    this.atualizar();
  }

  atualizar(){
    this.vagaService.getVagasEmpresa().subscribe( (vagas)=>{
      const data = vagas.data;

      data.map((vaga) => {
        vaga.createdAt = new Date(vaga.createdAt!).toLocaleDateString(
          'pt-BR'
        );
      });
      this.vagas=data;
    });
  }

  candidatos(id:number){
    this.alunos = this.vagas[id].alunos;
  }

  openDelete(vaga_id:string) {
    this.vagaSelecionada = vaga_id;
		this.modalService.open(this.modeldelete);
	}

  deletarVaga( ) {
    this.vagaService.deletarVaga(this.vagaSelecionada).subscribe(
      success => this.atualizar()
    );
  }

}
