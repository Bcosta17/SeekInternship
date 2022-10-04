import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Empresa } from 'src/app/Interfaces/Empresa';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { Validacoes } from 'src/app/shared/validators/validators';



@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Empresa>();
  @Input() btnText!: string;

  empresaForm!: FormGroup;
 
   
  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    ) { }
   
  ngOnInit(): void {
    this.empresaService.verificaEmail('').subscribe();
    this.empresaService.verificaCnpj('').subscribe();
    this.criarEmpresaForm();
  }
  
  criarEmpresaForm(){
    this.empresaForm = this.fb.group({
      id: [''],
      nomeEmpresa: [
        '',
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        
        ])
      ],
      nomeRepresentante: [
        '',
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
        ])
      ],
      email: ['', Validators.compose([Validators.email]),this.emailExiste.bind(this)],
      cnpj: ['', Validators.compose([Validators.required, Validacoes.VerificaCnpj]), this.cnpjExiste.bind(this)],
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
      confirmeSenha: ['', Validators.compose([Validators.required,Validacoes.SenhasCombinam('senha')])]
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
    return this.empresaService.verificaEmail(formControl.value)
    .pipe(
      map(emailExiste => emailExiste ? {emailInvalido:true} : null));
  }

  cnpjExiste(formControl: FormControl){
    return this.empresaService.verificaCnpj(formControl.value)
    .pipe(
      map(cnpjExiste => cnpjExiste ? {cnpjInvalido:true} : null));
  }

  submit(): void{
   if(this.empresaForm.invalid){
      return;
   }
    this.onSubmit.emit(this.empresaForm.value);
  }
  
}
