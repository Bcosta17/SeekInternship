import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JsonDadosService } from 'src/app/Services/json-dados.service';

import { Vaga } from 'src/app/Interfaces/Vagas';


import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-vaga-form',
  templateUrl: './vaga-form.component.html',
  styleUrls: ['./vaga-form.component.css']
})
export class VagaFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Vaga>();
  @Input() btnText!: string;
  @Input() msgSuccess!: string;
  @Input() vagaData: Vaga | null = null;
  
  
  selectedItems:any = [];
  dropdownSettings:IDropdownSettings= {};
  
  vagaForm!: FormGroup;
  areas!:string[];
  cursos!:string[];
  
  turnos = [
    "Matutino",
    "Vespertino",
    "Noturno",
    "A combinar",
  ];

  turnoInit!: string;
  
  constructor(
    private fb: FormBuilder,
    private dados: JsonDadosService
  ) { }

  ngOnInit(): void {
    this.criarVagaForm();
    this.setDefaults();
    this.dados.getArea().subscribe( dados => {this.areas= dados.sort();});
    this.dados.getCursos().subscribe( dados => this.cursos=dados);

    this.dropdownSettings= {
      singleSelection: false,
      itemsShowLimit: 3,
      limitSelection:3,
      allowSearchFilter: true,
      searchPlaceholderText:'Pesquise por um curso',
      noDataAvailablePlaceholderText:'Curso não encontrado'
    };

    this.vagaForm.get('selectedItens')?.setValue(this.vagaData?.curso)
  }
  
  onItemSelect(item: any) {
   return item;
  }

  criarVagaForm(){
    this.vagaForm = this.fb.group({
      id:[this.vagaData ? this.vagaData._id :''],
      nome:[this.vagaData ? this.vagaData.nome :'',Validators.compose([Validators.required,Validators.minLength(15), Validators.maxLength(65)])],
      descricao:[this.vagaData ? this.vagaData.descricao :'',Validators.compose([Validators.required,Validators.minLength(20)])],
      requisitos:[this.vagaData ? this.vagaData.requisitos :'',Validators.compose([Validators.required,Validators.minLength(10)])],
      curso:[this.vagaData ? this.vagaData.curso :'',Validators.compose([Validators.required])],
      remunerado:[this.vagaData ? this.vagaData.remunerado :'',Validators.compose([Validators.required])],
      turno:[this.vagaData ? this.vagaData.turno :'',Validators.compose([Validators.required])],
      observacoes:[this.vagaData ? this.vagaData!.observacoes :'',Validators.compose([Validators.minLength(5)])],
    })
  }

  get nome(){
    return this.vagaForm.get('nome')!;
  }

  get descricao(){
    return this.vagaForm.get('descricao')!;
  }

  get requisitos(){
    return this.vagaForm.get('requisitos')!;
  }

  get curso(){
    return this.vagaForm.get('curso')!;
  }

  get turno(){
    return this.vagaForm.get('turno')!;
  }

  get remunerado(){
    return this.vagaForm.get('remunerado')!;
  }
  get observacoes(){
    return this.vagaForm.get('observacoes')!;
  }

  setDefaults(){
    if(this.vagaData?.turno == null){
      this.vagaForm.get("turno")?.patchValue(null);
    }
  }
  submit(): void{
    if(this.vagaForm.valid){
      this.onSubmit.emit(this.vagaForm.value);
    }
    
  }

}
