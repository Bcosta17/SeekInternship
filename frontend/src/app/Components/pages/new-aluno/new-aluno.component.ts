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
    this.alunoService.createAluno(aluno).subscribe({
      next(){},
      error(err:any){
        console.log(err);
      },
    });
    this.router.navigate(['login']);
  }

}
