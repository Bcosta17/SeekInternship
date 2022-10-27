import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vaga } from 'src/app/Interfaces/Vagas';
import { LoginService } from 'src/app/Services/login.service';
import { VagasService } from 'src/app/Services/vagas.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  vaga?: Vaga;
  msgError!: string;
  success = false;
  decode:any = [];

  constructor(
    private vagaService: VagasService,
    private route: ActivatedRoute,
    private loginService: LoginService,
   
  ) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.vagaService.getVaga(id).subscribe((item) =>{
      this.vaga = item.data;
    });
    this.decode = this.loginService.decode();
  }

  candidatar(id:string){
    this.vagaService.cadidatarVaga(id).subscribe({
      next: (res)=> res,
      error: (e)=> (this.msgError = e),
    });
     this.success = true;
  }
  
}
