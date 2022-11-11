import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { faAdd, faEdit, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Aluno } from 'src/app/Interfaces/Aluno';
import { Email } from 'src/app/Interfaces/email';
import { Vaga } from 'src/app/Interfaces/Vagas';

import { VagasService } from 'src/app/Services/vagas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Email>();
  @ViewChild('modeldelete') modeldelete: any; 
  
  alunos: Aluno[] = [];
  vagas: Vaga[] = [];
  vagaSelecionada!: string;
  
  emailForm!: FormGroup;

  baseApiUrl= environment.baseApiUrl
  
  faTimes = faTimes;
  faEdit = faEdit;
  faAdd = faAdd;
  faEye = faEye;
 
  constructor(
    private fb: FormBuilder,
    private vagaService: VagasService,
    private modalService: NgbModal,
    
  ) { }
    
  ngOnInit(): void {
    this.atualizar();
    this.emailForm = this.fb.group({
      destino:[''],
      assunto:[''],
      mensagem:['']

    })

  }

  get destino(){
    return this.emailForm.get('destino')!;
  }

  get assunto(){
    return this.emailForm.get('assunto')!;
  }

  get mensagem(){
    return this.emailForm.get('mensagem')!;
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

  deletarVaga( ) {
    this.vagaService.deletarVaga(this.vagaSelecionada).subscribe(
      success => this.atualizar()
    );
  }

  open(content: any) {
    this.modalService.open(content)
			
	}

  openDelete(vaga_id:string) {
    this.vagaSelecionada = vaga_id;
		this.modalService.open(this.modeldelete);
	}

  submit(){
    this.onSubmit.emit(this.emailForm.value);
    console.log(this.emailForm.value);
  }
 
   
}
