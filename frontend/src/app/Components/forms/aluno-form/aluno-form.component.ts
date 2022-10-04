import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Empresa } from 'src/app/Interfaces/Empresa';
import { AlunoService } from 'src/app/Services/aluno.service';
import { Validacoes } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Empresa>();
  @Input() btnText!: string;

  alunoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
  ) { }

  ngOnInit(): void {
    this.criarEmpresaForm();
  }
  criarEmpresaForm() {
    this.alunoForm = this.fb.group({
      id: [],
      nome:[
        '',
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        ])
      ],
      cpf: ['', Validators.compose([Validators.required, Validacoes.VerificaCpf])],
      email:['', Validators.compose([Validators.email])],
      curso: ['', Validators.compose([Validators.required,Validators.minLength(3)]) ],
      interesses: ['', Validators.compose([Validators.required,Validators.minLength(10)])],
      telefone: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*')
        ])
      ],
      senha: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      confirmeSenha: ['', Validators.compose([Validators.required,Validacoes.SenhasCombinam('senha')])],

    })
  }

  get nome(){
    return this.alunoForm.get('nome');
  }

  get cpf(){
    return this.alunoForm.get('cpf');
  }

  get email(){
    return this.alunoForm.get('email');
  }

  get curso(){
    return this.alunoForm.get('curso');
  }

  get interesses(){
    return this.alunoForm.get('interesses');
  }

  get telefone(){
    return this.alunoForm.get('telefone');
  }

  get senha(){
    return this.alunoForm.get('senha');
  }

  get confirmeSenha(){
    return this.alunoForm.get('confirmeSenha');
  }
  
  submit(){
    if(this.alunoForm.invalid){
      return;
    }

    this.onSubmit.emit(this.alunoForm.value)
  }

}
