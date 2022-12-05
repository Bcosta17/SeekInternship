import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecuperacaoSenhaService } from 'src/app/Services/recuperacao-senha.service';
import { Validacoes } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.component.html',
  styleUrls: ['./mudar-senha.component.css']
})
export class MudarSenhaComponent implements OnInit {


  mudarSenhaForm: FormGroup = this.fb.group({
    senha: ['',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20),])],
    confirmeSenha: ['', Validators.compose([Validators.required,Validacoes.SenhasCombinam('senha')])],

  })

  public msgError!: string;
 

  constructor(
    private fb: FormBuilder,
    private recuperacaoSenha: RecuperacaoSenhaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  get senha(){
    return this.mudarSenhaForm.get('senha')!;
  }

  get confirmeSenha(){
    return this.mudarSenhaForm.get('confirmeSenha')!;
  }

  ngOnInit(): void {
   
  }

  submit(){
     const tokenSenha = this.route.snapshot.paramMap.get('id')!;
     const senha = (this.mudarSenhaForm.value).senha;
     
     if(this.mudarSenhaForm.valid){
     this.recuperacaoSenha.changePassword({tokenSenha,senha}).subscribe({
      next: (res)=> res,
      error: (e)=> (this.msgError = e),
     }
     )
     if(!this.msgError){
      this.router.navigate(['/login'])
     }
    }
  }
}
