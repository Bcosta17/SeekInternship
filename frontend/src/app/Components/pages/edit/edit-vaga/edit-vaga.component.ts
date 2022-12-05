import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { VagasService } from 'src/app/Services/vagas.service';

@Component({
  selector: 'app-edit-vaga',
  templateUrl: './edit-vaga.component.html',
  styleUrls: ['./edit-vaga.component.css']
})
export class EditVagaComponent implements OnInit {
  vaga!: Vaga;
  btnText: string = 'Editar';
  msgSuccess!: string;

  constructor(
    private  vagasService: VagasService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.vagasService.getVaga(id).subscribe((item)=>{
      this.vaga = item.data;

    });
  }

  editHandler(vagaData: Vaga){
    const id = this.vaga._id;
    this.vagasService.editarVaga(id!, vagaData).subscribe({
      next: (res)=> (this.msgSuccess = "Dados alterado com sucesso"),
    });
    

    
  }
}
