import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Email } from 'src/app/Interfaces/Email';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { AlunoService } from 'src/app/Services/aluno.service';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { VagasService } from 'src/app/Services/vagas.service';

@Component({
  selector: 'app-new-vaga',
  templateUrl: './new-vaga.component.html',
  styleUrls: ['./new-vaga.component.css']
})
export class NewVagaComponent implements OnInit {
  btnText:string = 'Cadastrar';
  emailForm!: FormGroup; 
  constructor(
    private vagaService: VagasService,
    private router: Router,
    private alunoService: AlunoService,
    private empresaService: EmpresaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  createVaga(vaga: Vaga){
    this.vagaService.createVaga(vaga).subscribe({
      next(){ },
      error(err:any){
        console.log(err);
      },
    });
    this.alunoService.comparaAlunoVaga().pipe(
      map(dados => dados.data.forEach(element => {
        vaga.curso.forEach(element2 => {
         const destino  = [element.email]
         const assunto  = "Temos uma vaga que talvez você tem interesse"
         const mensagem = `A vaga ${vaga.nome} é compativo com seu curso!`
          
         this.emailForm = this.fb.group({
          destino:[destino],
          assunto:[assunto],
          mensagem:[mensagem]
         })
         if(element.turno === vaga.turno && element2 == element.curso ){
            this.empresaService.enviarEmail(this.emailForm.value).subscribe()
          }
         
        });
      }))
    ).subscribe()
    
    this.router.navigate(['empresa']);
  }

}
