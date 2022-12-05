import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlunoService } from 'src/app/Services/aluno.service';
import { RecuperacaoSenhaService } from 'src/app/Services/recuperacao-senha.service';

@Component({
  selector: 'app-recuperacao-senha',
  templateUrl: './recuperacao-senha.component.html',
  styleUrls: ['./recuperacao-senha.component.css']
})
export class RecuperacaoSenhaComponent implements OnInit {
  forgotPasswordForm: FormGroup = this.fb.group({
    email:['', Validators.compose([Validators.required,Validators.email])],
  });

  public msgError!: string;
  public msgSuccess!: String; 
  

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private recuperacaoSenha: RecuperacaoSenhaService,
   

  ) { }

  ngOnInit(): void {
    
  }
  
  get email(){
    return this.forgotPasswordForm.get('email')!;
  }


  submit(){
    if (this.forgotPasswordForm.valid){
     this.recuperacaoSenha.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res)=> (this.msgSuccess = "Acesse seu email para redefinir a senha!"),
      error: (e)=> (this.msgError = e),
    })
     console.log(this.forgotPasswordForm.value);
    }

  }
  
}
