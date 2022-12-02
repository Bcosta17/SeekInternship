import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/Interfaces/Aluno';
import { AlunoService } from 'src/app/Services/aluno.service';

@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.component.html',
  styleUrls: ['./edit-aluno.component.css']
})
export class EditAlunoComponent implements OnInit {
  aluno!: Aluno
  btnText: string = 'Editar';

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.alunoService.getAluno(id).subscribe((item)=>{
      this.aluno = item.data;
    })
  }

  editHandler(alunoData: Aluno){
    console.log(alunoData)
    const id = this.aluno._id
    
   
    this.alunoService.editarAluno(id!, alunoData).subscribe({
      next(){},
      error(err:any){
        console.log(err);
      },
    });

    this.router.navigate(['/'])
  }


}
