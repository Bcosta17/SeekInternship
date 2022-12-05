import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { map } from 'rxjs';

import { AlunoService } from 'src/app/Services/aluno.service';

import { Aluno } from 'src/app/Interfaces/Aluno';

import { Validacoes } from 'src/app/shared/validators/validators';
import { JsonDadosService } from 'src/app/Services/json-dados.service';


@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Aluno>();
  @Input() btnText!: string;
  @Input() alunoData: Aluno | null = null;
 

  alunoForm!: FormGroup;
  cursos!:string[];

  turnos = [
    "Matutino",
    "Vespertino",
    "Noturno",
    "Diurno",
  ];

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private dados: JsonDadosService
  ) { }

  ngOnInit(): void {
    this.alunoService.verificaEmail('').subscribe();
    this.alunoService.verificaCpf('').subscribe();
    this.criarAlunoForm();
    this.setDefaults();
    this.dados.getCursos().subscribe( dados => this.cursos=dados);
    if(this.alunoData){
      this.alunoForm.get('cpf')!.disable();
      this.alunoForm.get('email')!.disable();
    }
   
  }

  criarAlunoForm() {
    this.alunoForm = this.fb.group({
      id: [this.alunoData ? this.alunoData._id : ''],
      nome:[
        this.alunoData ? this.alunoData.nome : '',
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        ])
      ],
      cpf: [this.alunoData ? this.alunoData.cpf : '', Validators.compose([Validators.required, Validacoes.VerificaCpf,Validators.pattern('[0-9]*')]),this.cpfExiste.bind(this)],//
      email:[this.alunoData ? this.alunoData.email : '', Validators.compose([Validators.email]),this.emailExiste.bind(this)],
      curso: [this.alunoData ? this.alunoData.curso : '', Validators.compose([Validators.required,Validators.minLength(3)]) ],
      telefone: [
        this.alunoData ? this.alunoData.telefone : '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*')
        ])
      ],
      periodo:[this.alunoData ? this.alunoData.periodo: '', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      turno:[this.alunoData ? this.alunoData.turno:'',Validators.required],
      senha: ['',this.alunoData ? Validators.compose([Validators.minLength(6), Validators.maxLength(20)]) : Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20),])],
      confirmeSenha: ['',this.alunoData ? [Validacoes.SenhasCombinam('senha')] : Validators.compose([Validators.required,Validacoes.SenhasCombinam('senha')])],

    })
  }

  get nome(){
    return this.alunoForm.get('nome')!;
  }

  get cpf(){
    return this.alunoForm.get('cpf')!;
  }

  get email(){
    return this.alunoForm.get('email')!;
  }

  get curso(){
    return this.alunoForm.get('curso')!;
  }

  get periodo(){
    return this.alunoForm.get('periodo')!;
  }
  get informacao(){
    return this.alunoForm.get('informacao')!;
  }

  get turno(){
    return this.alunoForm.get('turno')!;
  }
  
  get telefone(){
    return this.alunoForm.get('telefone')!;
  }

  get senha(){
    return this.alunoForm.get('senha')!;
  }

  get confirmeSenha(){
    return this.alunoForm.get('confirmeSenha')!;
  }

  setDefaults(){
    if(this.alunoData?.turno == null){
      this.alunoForm.get("turno")?.patchValue(null);
    }
  }
  emailExiste(formControl: FormControl){
    return this.alunoService.verificaEmail(formControl.value.toLowerCase())
    .pipe(
      map(emailExiste => emailExiste? {emailInvalido:true} : null));
  }

  cpfExiste(formControl: FormControl){
    return this.alunoService.verificaCpf(formControl.value)
    .pipe(
      map(cpfExiste => cpfExiste ? {cpfExiste:true}: null)
    )
  }

  submit(){
    if(this.alunoForm.valid){
  
      this.onSubmit.emit(this.alunoForm.value)
      
    }
  }

}
