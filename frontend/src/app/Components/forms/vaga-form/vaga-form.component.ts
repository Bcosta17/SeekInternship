import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JsonDadosService } from 'src/app/Services/json-dados.service';

import { Vaga } from 'src/app/Interfaces/Vagas';



@Component({
  selector: 'app-vaga-form',
  templateUrl: './vaga-form.component.html',
  styleUrls: ['./vaga-form.component.css']
})
export class VagaFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Vaga>();
  @Input() btnText!: string;
  @Input() vagaData: Vaga | null = null;
  
  vagaForm!: FormGroup;
  areas!:string[];
  cursos!:string[];
  
  turnos = [
    "Matutino",
    "Vespertino",
    "noturno",
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
  }

  criarVagaForm(){
    console.log(this.vagaData)
    this.vagaForm = this.fb.group({
      id:[this.vagaData ? this.vagaData._id :''],
      nome:[this.vagaData ? this.vagaData.nome :'',Validators.compose([Validators.required,Validators.minLength(3)])],
      descricao:[this.vagaData ? this.vagaData.descricao :'',Validators.compose([Validators.required,Validators.minLength(20)])],
      requisitos:[this.vagaData ? this.vagaData.requisitos :'',Validators.compose([Validators.required,Validators.minLength(10)])],
      curso:[this.vagaData ? this.vagaData.curso :'',Validators.compose([Validators.required,Validators.minLength(5)])],
      area:[this.vagaData ? this.vagaData.area :'',Validators.compose([Validators.required,Validators.minLength(5)])],
      remunerado:[this.vagaData ? this.vagaData.remunerado :'',Validators.compose([Validators.required])],
      turno:[this.vagaData ? this.vagaData.turno :'',Validators.compose([Validators.required])],
      observacoes:['',Validators.compose([Validators.minLength(5)])],
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

  get area(){
    return this.vagaForm.get('area')!;
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
      console.log(this.vagaForm.value);
     
    }
    this.onSubmit.emit(this.vagaForm.value);
  }

}
