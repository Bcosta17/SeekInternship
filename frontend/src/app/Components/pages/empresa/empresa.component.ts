import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faAdd, faEdit, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { Aluno } from 'src/app/Interfaces/Aluno';
import { Email } from 'src/app/Interfaces/Email';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { EmpresaService } from 'src/app/Services/empresa.service';

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
  
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:IDropdownSettings= {};
  
  alunos: Aluno[] = [];
  vagas: Vaga[] = [];
  vagaSelecionada!: string;
  
  emailForm!: FormGroup;
  emailCandidatos:any=[];
  nomeCandidatos:any=[];
  emailNomeCandidatos:any=[];

  baseApiUrl= environment.baseApiUrl
  
  faTimes = faTimes;
  faEdit = faEdit;
  faAdd = faAdd;
  faEye = faEye;
 
  constructor(
    private fb: FormBuilder,
    private vagaService: VagasService,
    private empresaService: EmpresaService,
    private modalService: NgbModal,
    
  ) {}
    
  ngOnInit(): void {
    this.atualizar();
    this.emailForm = this.fb.group({
      destino:['',Validators.required],
      assunto:['',Validators.required],
      mensagem:['',Validators.required]
    })
   
    this.dropdownSettings= {
      singleSelection: false,
      enableCheckAll:true,
      selectAllText:'Selecione todos os candidatos',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText:'Pesquise por um email',
      noDataAvailablePlaceholderText:'Email não encontrado'
    };
   
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
      console.log(this.vagas)
    });
  }

  candidatos(id:number){
    this.alunos = this.vagas[id].alunos;
    
    this.emailCandidatos = this.vagas[id].alunos.map(aluno => aluno.email);
    this.nomeCandidatos = this.vagas[id].alunos.map(aluno => aluno.nome);
    
    for (let i in this.emailCandidatos) {
      this.emailNomeCandidatos.push(this.nomeCandidatos[i]+'-'+this.emailCandidatos[i])
    }

    
  }

  deletarVaga( ) {
    this.vagaService.deletarVaga(this.vagaSelecionada).subscribe(
      success => this.atualizar()
    );
  }

  onItemSelect(item: any) {
    return item;
  }
 
  onSelectAll(items: any) {
    return items;
  }

  open(content: any) {
    this.modalService.open(content)
			
	}

  openDelete(vaga_id:string) {
    this.vagaSelecionada = vaga_id;
		this.modalService.open(this.modeldelete);
	}

  submit(){
    this.empresaService.enviarEmail(this.emailForm.value).subscribe({
      next(){},
      error(err: any) {
      console.log(err); 
    }
    });
    
  }
 
   
}
