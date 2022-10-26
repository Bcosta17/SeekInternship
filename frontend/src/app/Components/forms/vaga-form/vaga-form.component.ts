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

  setDefaults(){
    this.vagaForm.get("turno")?.patchValue(null);
  }

  criarVagaForm(){
    this.vagaForm = this.fb.group({
      id:[''],
      nome:['',Validators.compose([Validators.required,Validators.minLength(3)])],
      descricao:['',Validators.compose([Validators.required,Validators.minLength(20)])],
      requisitos:['',Validators.compose([Validators.required,Validators.minLength(10)])],
      curso:['',Validators.compose([Validators.required,Validators.minLength(5)])],
      area:['',Validators.compose([Validators.required,Validators.minLength(5)])],
      remunerado:['',Validators.compose([Validators.required])],
      turno:[this.turnoInit,Validators.compose([Validators.required])],
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

  submit(){
    if(this.vagaForm.valid){
      this.onSubmit.emit(this.vagaForm.value);
    }
  }

}
