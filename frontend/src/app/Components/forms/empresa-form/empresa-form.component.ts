import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

import { EmpresaService } from 'src/app/Services/empresa.service';

import { Empresa } from 'src/app/Interfaces/Empresa';

import { Validacoes } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Empresa>();
  @Input() btnText!: string;
  @Input() empresaData: Empresa | null = null;

  empresaForm!: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    ) { }
   
  ngOnInit(): void {
   
    this.criarEmpresaForm();
    if(this.empresaData){
      this.empresaForm.get('cnpj')!.disable();
      this.empresaForm.get('email')!.disable();
    }
  }
  
  
  criarEmpresaForm(){
    this.empresaService.verificaEmail('').subscribe();
    this.empresaService.verificaCnpj('').subscribe();
    this.empresaForm = this.fb.group({
      id: [this.empresaData ? this.empresaData._id : ''],
      nomeEmpresa: [
        this.empresaData ? this.empresaData.nomeEmpresa : '',
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        
        ])
      ],
      nomeRepresentante: [
        this.empresaData ? this.empresaData.nomeRepresentante : '',
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
        ])
      ],
      email: [this.empresaData ? this.empresaData.email : '', Validators.compose([Validators.required, Validators.email]),this.emailExiste.bind(this)],
      cnpj: [this.empresaData ? this.empresaData.cnpj : '',   Validators.compose([Validators.required, Validacoes.VerificaCnpj,  Validators.pattern('[0-9]*')]), this.cnpjExiste.bind(this)],
      telefone: [
        this.empresaData ? this.empresaData.telefone : '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*')
        ])
      ],
      senha: ['',this.empresaData ? Validators.compose([Validators.minLength(6), Validators.maxLength(20)]) : Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(20)])],
      confirmeSenha: ['', this.empresaData ? [Validacoes.SenhasCombinam('senha')]: Validators.compose([Validators.required,Validacoes.SenhasCombinam('senha')])]
    });
  }
  
  
 get email(){
    return this.empresaForm.get('email')!;
  }

  get nomeEmpresa(){
    return this.empresaForm.get('nomeEmpresa')!;
  }

  get nomeRepresentante(){
     return this.empresaForm.get('nomeRepresentante')!;
  }

  get cnpj(){
    return this.empresaForm.get('cnpj')!;
  }

  get telefone(){
    return this.empresaForm.get('telefone')!;
    
  }

  get senha(){
    return this.empresaForm.get('senha')!;
  }

  get confirmeSenha(){
    return this.empresaForm.get('confirmeSenha')!;
  }
  
  emailExiste(formControl: FormControl){
    return this.empresaService.verificaEmail(formControl.value.toLowerCase())
    .pipe(
      map(emailExiste => emailExiste? {emailInvalido:true} : null));
  }

  cnpjExiste(formControl: FormControl){
    return this.empresaService.verificaCnpj(formControl.value)
    .pipe(
      map(cnpjExiste => cnpjExiste ? {cnpjExiste:true} : null));
  }

  submit(): void{
   if(this.empresaForm.invalid){
      return;
   }
    this.onSubmit.emit(this.empresaForm.value);
  }

  
}
