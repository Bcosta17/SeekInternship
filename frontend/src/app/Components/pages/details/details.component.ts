import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { VagasService } from 'src/app/Services/vagas.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  vaga?: Vaga;
  msgError!: string;
  
  constructor(
    private vagaService: VagasService,
    private route: ActivatedRoute,
   
  ) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.vagaService.getVaga(id).subscribe((item) =>{
      this.vaga = item.vaga;
    });

  }

  candidatar(id:string){
    this.vagaService.cadidatarVaga(id).subscribe({
      next: (res)=> res,
      error: (e)=> (this.msgError = e),
    });
  }
  
}
