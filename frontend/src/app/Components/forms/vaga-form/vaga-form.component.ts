import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VagasService } from 'src/app/Services/vagas.service';

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
  
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.criarVagaForm();
  }

  criarVagaForm(){
    this.vagaForm = this.fb.group({
      id:[''],
      nome:['',Validators.compose([Validators.required,Validators.minLength(5)])],
      descricao:['',Validators.compose([Validators.required,Validators.minLength(20)])],
      requisitos:['',Validators.compose([Validators.required,Validators.minLength(10)])],
      escolaridade:['',Validators.compose([Validators.required,Validators.minLength(5)])],
      area:[''],
      remunerado:[''],
      turno:['',Validators.compose([Validators.required])],
      observacoes:[''],
    })
  }

  get nome(){
    return this.vagaForm.get('nome');
  }

  get descricao(){
    return this.vagaForm.get('descricao');
  }

  get requisitos(){
    return this.vagaForm.get('requisitos');
  }

  get escolaridade(){
    return this.vagaForm.get('escolaridade');
  }

  get turno(){
    return this.vagaForm.get('turno');
  }

  get area(){
    return this.vagaForm.get('area');
  }
  get remunerado(){
    return this.vagaForm.get('remunerado');
  }
  get observacoes(){
    return this.vagaForm.get('observacoes');
  }

  submit(){
    if(this.vagaForm.valid){
      this.onSubmit.emit(this.vagaForm.value);
    }
  }

}
