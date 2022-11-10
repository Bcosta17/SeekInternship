import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/Interfaces/Aluno';
import { AlunoService } from 'src/app/Services/aluno.service';

@Component({
  selector: 'app-new-aluno',
  templateUrl: './new-aluno.component.html',
  styleUrls: ['./new-aluno.component.css']
})
export class NewAlunoComponent implements OnInit {
  btnText = 'Cadastrar';

  constructor(
    private alunoService: AlunoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createAluno(aluno: Aluno){
    const formData = new FormData();

    formData.append('nome',aluno.nome);
    formData.append('email',aluno.email);
    formData.append('cpf',aluno.cpf);
    formData.append('telefone',aluno.telefone);
    formData.append('curriculo',aluno.curriculo);
    formData.append('curso',aluno.curso);
    formData.append('senha',aluno.senha);
    formData.append('confirmeSenha',aluno.confirmeSenha);

    this.alunoService.createAluno(formData).subscribe({
      next(){},
      error(err:any){
        console.log(err);
      },
    });
    this.router.navigate(['login']);
  }

}
