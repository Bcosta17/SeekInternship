import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { VagasService } from 'src/app/Services/vagas.service';

@Component({
  selector: 'app-new-vaga',
  templateUrl: './new-vaga.component.html',
  styleUrls: ['./new-vaga.component.css']
})
export class NewVagaComponent implements OnInit {
  btnText = 'Cadastrar';

  constructor(
    private vagaService: VagasService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createVaga(vaga: Vaga){
    this.vagaService.createVaga(vaga).subscribe({
      next(){},
      error(err:any){
        console.log(err);
      },
    });
    this.router.navigate(['login']);
  }

}
